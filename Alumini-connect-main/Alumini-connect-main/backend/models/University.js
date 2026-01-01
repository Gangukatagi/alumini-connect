// models/University.js
const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    maxlength: 1000
  },
  website: {
    type: String
  },
  studentsCount: {
    type: Number,
    default: 0
  },
  alumniCount: {
    type: Number,
    default: 0
  },
  establishedYear: {
    type: Number
  },
  contactEmail: {
    type: String
  },
  contactPhone: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('University', universitySchema);