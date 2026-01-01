// routes/chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// @route   GET /api/chat/conversations
// @desc    Get all conversations for current user
// @access  Private
router.get('/conversations', auth, async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user.id },
            { receiver: req.user.id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user.id] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $first: '$ROOT' }
        }
      }
    ]);
    
    await Message.populate(messages, {
      path: 'lastMessage.sender lastMessage.receiver',
      select: 'name profilePicture position company'
    });
    
    res.json({
      success: true,
      conversations: messages
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/chat/:userId
// @desc    Get chat history with a specific user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    })
    .populate('sender', 'name profilePicture')
    .populate('receiver', 'name profilePicture')
    .sort({ createdAt: 1 });
    
    // Mark messages as read
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user.id, read: false },
      { read: true }
    );
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/chat
// @desc    Send a message
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { receiver, message } = req.body;
    
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      message
    });
    
    await newMessage.save();
    await newMessage.populate('sender receiver', 'name profilePicture');
    
    res.status(201).json({
      success: true,
      message: newMessage
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/chat/unread/count
// @desc    Get unread message count
// @access  Private
router.get('/unread/count', auth, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.user.id,
      read: false
    });
    
    res.json({
      success: true,
      unreadCount: count
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/chat/:messageId/read
// @desc    Mark message as read
// @access  Private
router.put('/:messageId/read', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    
    if (message.receiver.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }
    
    message.read = true;
    await message.save();
    
    res.json({
      success: true,
      message: 'Message marked as read'
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