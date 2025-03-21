const express = require('express');
const multer = require('multer');
const authenticateUser = require('../middleware/authMiddleware'); 
const Project = require('../models/Project');
const User = require('../models/User');

const router = express.Router();

// ✅ Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Debugging logs 
console.log('✅ projectRoutes loaded successfully');
console.log("authenticateUser type:", typeof authenticateUser);

// ✅ CREATE Project Route
router.post(
  '/',
  authenticateUser,
  upload.fields([
    { name: 'coverPhoto', maxCount: 1 },
    { name: 'media', maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      console.log('✅ Request received at /api/projects');

      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (user.role !== 'pro user') {
        return res.status(403).json({ message: 'Only pro users can create projects' });
      }

      const { title, description, sections, references } = req.body;
      if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const coverPhoto = req.files['coverPhoto'] ? req.files['coverPhoto'][0].path : '';
      const mediaFiles = req.files['media'] ? req.files['media'].map(file => file.path) : [];

      let parsedSections = [];
      try {
        parsedSections = sections ? JSON.parse(sections) : [];
        if (!Array.isArray(parsedSections)) throw new Error("Invalid 'sections' array");
        parsedSections = parsedSections.map(section => {
          if (!section.title || !section.content || !section.dimension) {
            throw new Error("Section must have title, content, and dimension.");
          }
          return section;
        });
      } catch (error) {
        return res.status(400).json({ message: "Invalid 'sections' format.", error: error.message });
      }

      let parsedReferences = [];
      try {
        parsedReferences = references ? JSON.parse(references) : [];
        if (!Array.isArray(parsedReferences)) throw new Error("Invalid 'references' array.");
        parsedReferences = parsedReferences.map(ref => {
          if (!ref.title) throw new Error("Each reference must have a title.");
          return ref;
        });
      } catch (error) {
        return res.status(400).json({ message: "Invalid 'references' format.", error: error.message });
      }

      const newProject = new Project({
        title,
        description,
        coverPhoto,
        media: mediaFiles,
        dateOfPublish: new Date(),
        author: user._id,
        sections: parsedSections,
        references: parsedReferences,
      });

      await newProject.save();
      console.log('✅ Project created:', newProject);

      res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
      console.error('❌ Error creating project:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// =======================
// ✅ DELETE Project Route
// =======================
router.delete('/:id', authenticateUser, async (req, res) => 
  {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Optional: Only allow the owner or admin to delete
    if (project.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// =======================
// ✅ UPDATE Project Route
// =======================
// ✅ UPDATE Project Route
router.put(
  '/:id',
  authenticateUser,
  upload.fields([
    { name: 'coverPhoto', maxCount: 1 },
    { name: 'media', maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      const projectId = req.params.id;
      const userId = req.user.userId;

      // ✅ Find project
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // ✅ Check ownership
      if (project.author.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized to update this project' });
      }

      // ✅ Parse body fields
      const { title, description, sections, references } = req.body;

      // Optional fields to update
      if (title) project.title = title;
      if (description) project.description = description;

      // ✅ Handle sections update
      if (sections) {
        let parsedSections;
        try {
          parsedSections = JSON.parse(sections);
          if (!Array.isArray(parsedSections)) throw new Error();
          project.sections = parsedSections;
        } catch (err) {
          return res.status(400).json({ message: 'Invalid sections format. Must be JSON array.' });
        }
      }

      // ✅ Handle references update
      if (references) {
        let parsedReferences;
        try {
          parsedReferences = JSON.parse(references);
          if (!Array.isArray(parsedReferences)) throw new Error();
          project.references = parsedReferences;
        } catch (err) {
          return res.status(400).json({ message: 'Invalid references format. Must be JSON array.' });
        }
      }

      // ✅ Handle files
      if (req.files['coverPhoto']) {
        project.coverPhoto = req.files['coverPhoto'][0].path;
      }
      if (req.files['media']) {
        const mediaFiles = req.files['media'].map(file => file.path);
        project.media = mediaFiles;
      }

      // ✅ Save updated project
      await project.save();
      res.status(200).json({ message: 'Project updated', project });
    } catch (error) {
      console.error('❌ Error updating project:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// ✅ Export the Router
module.exports = router;



