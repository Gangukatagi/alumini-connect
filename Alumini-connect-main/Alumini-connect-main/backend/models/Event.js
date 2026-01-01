// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['career-fair', 'hackathon', 'workshop', 'networking', 'seminar', 'other'],
    default: 'other'
  },
  host: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  maxAttendees: {
    type: Number,
    default: 100
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    phone: String,
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);