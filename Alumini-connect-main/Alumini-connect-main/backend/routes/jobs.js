// routes/jobs.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Multer configuration for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { university, type, location } = req.query;
    const filter = { isActive: true };
    
    if (university) filter.university = university;
    if (type) filter.type = type;
    if (location) filter.location = new RegExp(location, 'i');
    
    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email company position')
      .populate('university', 'name location')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email company position')
      .populate('university', 'name location')
      .populate('applications.user', 'name email');
    
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    
    res.json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/jobs
// @desc    Create new job
// @access  Private (Alumni/Admin)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.userType === 'student') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only alumni can post jobs' 
      });
    }
    
    const job = new Job({
      ...req.body,
      postedBy: req.user.id
    });
    
    await job.save();
    
    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for a job
// @access  Public
router.post('/:id/apply', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, cgpa, coverLetter } = req.body;
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    
    if (!job.isActive) {
      return res.status(400).json({ 
        success: false, 
        message: 'This job is no longer active' 
      });
    }
    
    // Check if already applied
    const alreadyApplied = job.applications.some(
      app => app.email === email
    );
    
    if (alreadyApplied) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already applied for this job' 
      });
    }
    
    const application = {
      name,
      email,
      cgpa,
      coverLetter,
      resume: req.file ? req.file.path : null
    };
    
    job.applications.push(application);
    await job.save();
    
    res.json({
      success: true,
      message: 'Application submitted successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/jobs/:jobId/applications/:applicationId
// @desc    Update application status
// @access  Private (Job poster)
router.put('/:jobId/applications/:applicationId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    
    // Check if user is job poster
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }
    
    const application = job.applications.id(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    
    application.status = status;
    await job.save();
    
    res.json({
      success: true,
      message: 'Application status updated',
      job
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    
    // Check if user is poster or admin
    if (job.postedBy.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }
    
    await job.deleteOne();
    
    res.json({
      success: true,
      message: 'Job deleted successfully'
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