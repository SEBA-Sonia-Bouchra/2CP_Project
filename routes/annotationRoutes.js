const express = require('express');
const router = express.Router();
const Annotation = require('../models/annotation');
const Project = require('../models/Project');
const authenticateUser = require('../middleware/authUser');


// 🟢 Create Annotation
router.post('/', authenticateUser, async (req, res) => {
  try {
    const user = req.user;

    // ✅ Check if user is Pro
    if (req.user.role !== 'pro user') {
        return res.status(403).json({ message: 'Only pro users can annotate sections.' });
      }
      
    const { content, projectId, sectionId } = req.body;

    if (!content || !projectId || !sectionId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const annotation = new Annotation({
      user: user._id,
      name: user.name,
      surname: user.surname,
      content,
      project: projectId,
      sectionId: sectionId
    });

    await annotation.save();

    res.status(201).json({ message: 'Annotation created successfully.', annotation });
  } catch (error) {
    console.error('Error creating annotation:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

module.exports = router;
