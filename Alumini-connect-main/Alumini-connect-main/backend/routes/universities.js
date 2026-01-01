// routes/universities.js
const express = require('express');
const router = express.Router();
const University = require('../models/University');
const auth = require('../middleware/auth');

// @route   GET /api/universities
// @desc    Get all universities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const universities = await University.find().sort({ name: 1 });
    
    res.json({
      success: true,
      count: universities.length,
      universities
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/universities/:id
// @desc    Get single university
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({ 
        success: false, 
        message: 'University not found' 
      });
    }
    
    res.json({
      success: true,
      university
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/universities
// @desc    Create new university (Admin only)
// @access  Private/Admin
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only admins can create universities' 
      });
    }
    
    const university = new University(req.body);
    await university.save();
    
    res.status(201).json({
      success: true,
      message: 'University created successfully',
      university
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/universities/request
// @desc    Request a new university
// @access  Public
router.post('/request', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // In a real application, you would send an email to admin or store this request
    console.log('University Request:', { name, email, message });
    
    res.json({
      success: true,
      message: 'University request submitted successfully. We will review it shortly.'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/universities/:id
// @desc    Update university (Admin only)
// @access  Private/Admin
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only admins can update universities' 
      });
    }
    
    const university = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!university) {
      return res.status(404).json({ 
        success: false, 
        message: 'University not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'University updated successfully',
      university
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   DELETE /api/universities/:id
// @desc    Delete university (Admin only)
// @access  Private/Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only admins can delete universities' 
      });
    }
    
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({ 
        success: false, 
        message: 'University not found' 
      });
    }
    
    await university.deleteOne();
    
    res.json({
      success: true,
      message: 'University deleted successfully'
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