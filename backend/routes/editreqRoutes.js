const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authUser');
const EditRequest = require('../models/EditRequest');
const Project = require('../models/Project');
const User = require('../models/User');
const Notification = require('../models/Notification');


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
    const notification = new Notification({
      projectId: project._id,
      recipientId: project.author._id, // assuming 'author' is the project owner
      requesterId: requester._id,
      requesterName: requester.firstname + ' ' + requester.lastname,
      projectName: project.title, // or project.name
      message: `${requester.firstname} ${requester.lastname} wants to edit your project "${project.title}".`,
      type: 'edit-request',
      status: 'none',
      isRead: false
    });

    await notification.save();

    res.status(200).json({ message: 'Edit request sent successfully.', request: newRequest });
  } catch (error) {
    console.error('❌ Error in sending edit request:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all edit requests for a specific project
router.get('/project/:id', authenticateUser, async (req, res) => {
  try {
    const requests = await EditRequest.find({ project: req.params.id, status: 'pending' })
      .populate('requester', 'firstname lastname profilePicture'); 

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching edit requests:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user's edit request for a specific project
router.get('/project/:id/me', authenticateUser, async (req, res) => {
  try {
    const request = await EditRequest.findOne({
      project: req.params.id,
      requester: req.user._id
    });

    if (!request) {
      return res.status(200).json({ status: 'noRequest' });
    }

    res.status(200).json({ status: request.status });
  } catch (error) {
    console.error('Error fetching user edit request:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
