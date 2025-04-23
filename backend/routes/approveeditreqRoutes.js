const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authUser');
const EditRequest = require('../models/EditRequest');
const Project = require('../models/Project');
const User = require('../models/User');

// Approve or reject edit request
router.patch('/:requestId', authenticateUser, async (req, res) => {
  try {
    const { action } = req.body; // 'accept' or 'reject'

    const editRequest = await EditRequest.findById(req.params.requestId).populate('project');
    if (!editRequest) return res.status(404).json({ message: 'Edit request not found' });

    const project = editRequest.project;

    // ✅ No need to fetch User again if you already have isProfessional in req.user
    if (!req.user.isProfessional) {
      return res.status(403).json({ message: 'Only professional users can approve or reject edit requests.' });
    }

    // ✅ Compare project.author to req.user._id
    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only project owner can approve or reject edit requests.' });
    }

    if (action === 'accept') {
      editRequest.status = 'accepted';
    } else if (action === 'reject') {
      editRequest.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await editRequest.save();

    res.status(200).json({ message: `Edit request ${action}ed successfully.` });
  } catch (error) {
    console.error('❌ Error Approving/Rejecting Edit Request:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
