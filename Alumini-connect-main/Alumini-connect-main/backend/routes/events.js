// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { university, type } = req.query;
    const filter = {};
    
    if (university) filter.university = university;
    if (type) filter.type = type;
    
    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .populate('university', 'name location')
      .sort({ date: 1 });
    
    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('university', 'name location')
      .populate('attendees.user', 'name email');
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user.id
    });
    
    await event.save();
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/events/:id/join
// @desc    Join an event
// @access  Public
router.post('/:id/join', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    // Check if event is full
    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ 
        success: false, 
        message: 'Event is full' 
      });
    }
    
    // Check if already registered
    const alreadyRegistered = event.attendees.some(
      attendee => attendee.email === email
    );
    
    if (alreadyRegistered) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already registered for this event' 
      });
    }
    
    event.attendees.push({ name, email, phone });
    await event.save();
    
    res.json({
      success: true,
      message: 'Successfully joined event',
      event
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    // Check if user is creator or admin
    if (event.createdBy.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }
    
    await event.deleteOne();
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;