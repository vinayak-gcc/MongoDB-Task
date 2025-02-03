const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["woman", "job-poster", "admin"], required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  profile: {
    name: String,
    age: { type: Number, min: 18, max: 100 },
    skills: [String],
    location: String,
    resumeUrl: String,
    orgName: String,
    address: String,
    GSTIN: { type: String, match: /^[0-9A-Z]{15}$/ }, // 15-character alphanumeric
    contact: String
  }
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the plaintext password with the hashed password
    user.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};

userSchema.index({ email: 1 }, { unique: true }); // Unique index for email
userSchema.index({ role: 1 }); // Index for role

const User = mongoose.model("User", userSchema);
module.exports = User;