
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, min: 0, required: true }, 
  type: { type: String, enum: ["full-time", "part-time", "internship" ,"contract"], required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  payment: { type: String } ,

});



jobSchema.index({ location: 1, type: 1 }); // Compound index for location and type
jobSchema.index({ postedBy: 1 }); // Index for postedBy



const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
