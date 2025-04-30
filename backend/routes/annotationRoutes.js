const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Annotation = require('../models/annotation');
const Project = require('../models/Project');
const authenticateUser = require('../middleware/authUser');


// 🟢 Create Annotation
router.post('/', authenticateUser, async (req, res) => {
  try {
    const user = req.user;

    console.log("🔹 Authenticated User:", user);

    // ✅ Check if user is a Pro
    if (!user.isProfessional) {
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
      firstname: user.firstname,
      lastname: user.lastname,
      content,
      project: projectId,
      sectionId: sectionId
    });
    await annotation.save();

    res.status(201).json({ message: 'Annotation created successfully.', annotation });
  } catch (error) {
    console.error('❌ Error creating annotation:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});


// ✅ DELETE Annotation Route (owner of annotation OR project can delete)
router.delete('/:annotationId', authenticateUser, async (req, res) => {
  try {
    const { annotationId } = req.params;


    const userIdFromToken = req.user.userId || (req.user._id && req.user._id.toString());

    if (!userIdFromToken) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found.' });
    }

    // 1️⃣ Find the annotation
    const annotation = await Annotation.findById(annotationId);

    if (!annotation) {
      return res.status(404).json({ message: 'Annotation not found.' });
    }

    const annotationOwnerId = annotation.user.toString();
    const currentUserId = userIdFromToken;

    // 2️⃣ Find the project this annotation belongs to
    const project = await Project.findById(annotation.project);

    if (!project) {
      return res.status(404).json({ message: 'Associated project not found.' });
    }

    const projectOwnerId = project.author.toString();



    // 3️⃣ Check if current user is either the annotation owner or project owner
    if (annotationOwnerId !== currentUserId && projectOwnerId !== currentUserId) {
      return res.status(403).json({ message: 'Not authorized to delete this annotation.' });
    }

    // 4️⃣ Delete the annotation
    await Annotation.findByIdAndDelete(annotationId);

    return res.status(200).json({ message: 'Annotation deleted successfully.' });

  } catch (error) {
    console.error("❌ DELETE Annotation Error:", error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
});


// ✏️ Edit Annotation Route 
router.put('/:annotationId', authenticateUser, async (req, res) => {
  try {
    const { annotationId } = req.params;
    const { content } = req.body;
    //check if there's content
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content is required.' });
    }

    // find the annotation
    const annotation = await Annotation.findById(annotationId);
    if (!annotation) {
      return res.status(404).json({ message: 'Annotation not found.' });
    }

    //check the editor
    if (annotation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this annotation.' });
    }

    annotation.content = content;
    await annotation.save();

    res.status(200).json({ message: 'Annotation updated successfully.', annotation });

  } catch (error) {
    console.error('❌ Server Error Editing Annotation:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;