// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'contract', 'remote'],
    required: true
  },
  salary: {
    type: String
  },
  requirements: [{
    type: String
  }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applications: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    resume: String,
    cgpa: Number,
    coverLetter: String,
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
      default: 'pending'
    }
  }],
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true
  },
  deadline: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  companyLogo: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);