const mongoose = require("mongoose");
const User = require("../models/user.model");
const Job = require("../models/job.model");
const Application = require("../models/application.model");

mongoose.connect("mongodb://localhost:27017/jobPlatform");

const seedData = async () => {
  
  // Clear existing data
  await User.deleteMany({});
  await Job.deleteMany({});
  await Application.deleteMany({});

  // Insert 2 women users
  const woman1 = await User.create({
    role: "woman",
    email: "woman1@example.com",
    password: "hashedPassword1",
    profile: {
      name: "Alice",
      age: 25,
      skills: ["JavaScript", "React"],
      location: "New York",
      resumeUrl: "http://example.com/resume1"
    }
  });

  const woman2 = await User.create({
    role: "woman",
    email: "woman2@example.com",
    password: "hashedPassword2",
    profile: {
      name: "Bob",
      age: 30,
      skills: ["Node.js", "MongoDB"],
      location: "San Francisco",
      resumeUrl: "http://example.com/resume2"
    }
  });

  // Insert 1 pending and 1 approved job poster
  const jobPosterPending = await User.create({
    role: "job-poster",
    email: "poster1@example.com",
    password: "hashedPassword3",
    isApproved: false,
    profile: {
      orgName: "Pending Corp",
      address: "123 Main St",
      GSTIN: "ABCDE1234567890",
      contact: "123-456-7890"
    }
  });

  const jobPosterApproved = await User.create({
    role: "job-poster",
    email: "poster2@example.com",
    password: "hashedPassword4",
    isApproved: true,
    profile: {
      orgName: "Approved Corp",
      address: "456 Elm St",
      GSTIN: "FGHIJ1234567890",
      contact: "987-654-3210"
    }
  });

  // sample jobs linked to the approved job poster
  const job1 = await Job.create({
    title: "Frontend Developer",
    description: "Work on cutting-edge web applications.",
    location: "New York",
    salary: 80000,
    type: "full-time",
    postedBy: jobPosterApproved._id
  });

  const job2 = await Job.create({
    title: "Backend Developer",
    description: "Build scalable APIs.",
    location: "Me",
    salary: 90000,
    type: "part-time",
    postedBy: jobPosterApproved._id
  });

  const job3 = await Job.create({
    title: "DevOps Engineer",
    description: "Manage cloud infrastructure.",
    location: "Remote",
    salary: 100000,
    type: "contract",
    postedBy: jobPosterApproved._id
  });

  // 2 sample applications
  await Application.create({
    jobId: job1._id,
    userId: woman1._id,
    coverLetter: "I am excited to apply for this role!",
    status: "applied"
  });

  await Application.create({
    jobId: job2._id,
    userId: woman2._id,
    coverLetter: "I have relevant experience for this position.",
    status: "shortlisted"
  });

  console.log("Database seeded successfully!");
  mongoose.connection.close();
};

seedData();