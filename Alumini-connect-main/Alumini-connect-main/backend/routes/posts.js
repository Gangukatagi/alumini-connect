// routes/posts.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Multer configuration for post attachments
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith('image') ? 'uploads/images/' :
                   file.mimetype.startsWith('video') ? 'uploads/videos/' :
                   'uploads/documents/';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { university } = req.query;
    const filter = university ? { university } : {};
    
    const posts = await Post.find(filter)
      .populate('author', 'name profilePicture position company userType')
      .populate('comments.user', 'name profilePicture')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name profilePicture position company')
      .populate('comments.user', 'name profilePicture');
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    res.json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', auth, upload.array('attachments', 5), async (req, res) => {
  try {
    const { content } = req.body;
    
    const attachments = req.files ? req.files.map(file => ({
      type: file.mimetype.startsWith('image') ? 'image' :
            file.mimetype.startsWith('video') ? 'video' : 'document',
      url: file.path,
      filename: file.originalname
    })) : [];
    
    const post = new Post({
      author: req.user.id,
      content,
      attachments,
      university: req.user.university
    });
    
    await post.save();
    await post.populate('author', 'name profilePicture position company');
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post
    });
  } catch (error) {
     console.log("POST ERROR:", error);  
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/posts/:id/like
// @desc    Like/Unlike a post
// @access  Private
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.user.id);
    }
    
    await post.save();
    
    res.json({
      success: true,
      message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
      likesCount: post.likes.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/posts/:id/comment
// @desc    Comment on a post
// @access  Private
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    const comment = {
      user: req.user.id,
      text
    };
    
    post.comments.push(comment);
    await post.save();
    await post.populate('comments.user', 'name profilePicture');
    
    res.json({
      success: true,
      message: 'Comment added',
      comments: post.comments
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    // Check if user is post author or admin
    if (post.author.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }
    
    await post.deleteOne();
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
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