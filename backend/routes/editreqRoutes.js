const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authUser');
const EditRequest = require('../models/EditRequest');
const Project = require('../models/Project');
const User = require('../models/User');

// Send an edit request
router.post('/:id', authenticateUser, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 🚀 Get requester using req.user._id
    const requester = await User.findById(req.user._id);

    if (!requester || !requester.isProfessional) {
      return res.status(403).json({ message: 'Only professional users can request edits.' });
    }

    // 🚀 Check if an existing pending request exists
    const existingRequest = await EditRequest.findOne({
      project: project._id,
      requester: requester._id,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request for this project.' });
    }

    // 🚀 Create new edit request
    const newRequest = new EditRequest({
      project: project._id,
      requester: requester._id
    });

    await newRequest.save();

    res.status(200).json({ message: 'Edit request sent successfully.', request: newRequest });
  } catch (error) {
    console.error('❌ Error in sending edit request:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
