const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String, required: true },
  status: { type: String, enum: ["applied", "shortlisted", "rejected"], default: "applied" },
  appliedAt: { type: Date, default: Date.now }
});

applicationSchema.index({ jobId: 1, userId: 1 }); // index for jobId and userId
applicationSchema.index({ status: 1 }); // Index for status

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
