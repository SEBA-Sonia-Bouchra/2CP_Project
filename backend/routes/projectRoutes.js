const express = require('express');
const multer = require('multer');
const authenticateUser = require('../middleware/authMiddleware'); 
const Project = require('../models/Project');
const User = require('../models/User');
const Annotation = require('../models/annotation');
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

console.log('✅ projectRoutes loaded successfully');

// ✅ CREATE Project Route
router.post(
  '/',
  authenticateUser,
  upload.fields([
    { name: 'coverPhoto', maxCount: 1 },
    { name: 'media', maxCount: 10 }  //we can add the number of media
  ]),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (!user.isProfessional) {
        return res.status(403).json({ message: 'Only pro users can annotate sections.' });
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

        if (parsedSections.length > 4) throw new Error("Only up to 4 sections allowed.");

        const dimensionSet = new Set();
        const restrictedDimensions =['history', 'architecture', 'archeology'];

        parsedSections.forEach(section => {
          if (!section.title || !section.content || !section.dimension) {
            throw new Error("Each section must have title, content, and dimension.");
          }

          if (restrictedDimensions.includes(section.dimension)) {
            if (dimensionSet.has(section.dimension)) {
              throw new Error(`Duplicate dimension '${section.dimension}' not allowed.`);
            }
            dimensionSet.add(section.dimension);
          } else {
            if ([...dimensionSet].some(dim => restrictedDimensions.includes(dim) === false)) {
              throw new Error("Only one custom dimension allowed.");
            }
            dimensionSet.add(section.dimension);
          }
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

      res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// ✅ Add Section Route
router.post('/:id/sections', authenticateUser, async (req, res) => {
  try {
    //finding the project
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    //check if prouser
    const user = await User.findById(req.user.userId);
    if (!user.isProfessional) {
      return res.status(403).json({ message: 'Only pro users can add sections.' });
    }
  
    // check for all the parts
    const { title, content, dimension } = req.body;
    if (!title || !content || !dimension) {
      return res.status(400).json({ message: 'All fields are required for section' });
    }

    const restrictedDimensions = ['history', 'architecture', 'archeology'];
    const existingDimensions = project.sections.map(sec => sec.dimension);
     // check for the dimentions existance 
    if (restrictedDimensions.includes(dimension)) {
      if (existingDimensions.includes(dimension)) {
        return res.status(400).json({ message: `Section with dimension '${dimension}' already exists.` });
      }
    } else {
      if (existingDimensions.some(dim => !restrictedDimensions.includes(dim))) {
        return res.status(400).json({ message: 'Custom section already exists.' });
      }
    }

    project.sections.push({ title, content, dimension });
    await project.save();

    res.status(200).json({ message: 'Section added', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Delete Section Route
router.delete('/:projectId/sections/:sectionId', authenticateUser, async (req, res) => {
  try {
    const { projectId, sectionId } = req.params;

    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Get the section from the project
    const section = project.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: 'Section not found' });

    // Check if the user is the project owner or section creator
    const isOwner = project.author.toString() === req.user.userId;
    const isSectionCreator = section.author && section.author.toString() === req.user.userId;

    if (!isOwner && !isSectionCreator) {
      return res.status(403).json({ message: 'Not authorized to delete this section' });
    }

    // ✅ Delete annotations linked to this section in this project
    await Annotation.deleteMany({
      project: projectId,
      sectionId: sectionId
    });

    // Remove the section from the project
    project.sections.pull(sectionId);
    await project.save();

    res.status(200).json({ message: 'Section and related annotations deleted successfully', project });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// ✅ DELETE Project Route

router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      console.log('❌ Project Not Found');
      return res.status(404).json({ message: 'Project not found' });
    }

    
    if (project.author.toString() !== req.user.userId) {
      console.log('🚫 Not authorized to delete this project');
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    // Delete annotations linked to the project
    await Annotation.deleteMany({ project: projectId });

    // Delete the project
    await Project.findByIdAndDelete(projectId);

    console.log('✅ Project and annotations deleted');
    res.status(200).json({ message: 'Project and related annotations deleted successfully' });

  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


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

      const project = await Project.findById(projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      if (project.author.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized to update this project' });
      }

      const { title, description, references } = req.body;
      if (title) project.title = title;
      if (description) project.description = description;

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

      if (req.files['coverPhoto']) {
        project.coverPhoto = req.files['coverPhoto'][0].path;
      }
      if (req.files['media']) {
        const mediaFiles = req.files['media'].map(file => file.path);
        project.media = mediaFiles;
      }

      await project.save();
      res.status(200).json({ message: 'Project updated', project });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);



// ✅ Update Section Route
//only the owner of the project and the writer of the section that can edit section also this module checkes that we can not edit with a dimention already existe
router.put('/:projectId/sections/:sectionId', authenticateUser, async (req, res) => {
  try {
    const { projectId, sectionId } = req.params;
    const { title, content, dimension } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const section = project.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: 'Section not found' });

    const isOwner = project.author.toString() === req.user.userId;
    const isSectionCreator = section.author && section.author.toString() === req.user.userId;

    if (!isOwner && !isSectionCreator) {
      return res.status(403).json({ message: 'Not authorized to update this section' });
    }

    const restrictedDimensions = ['history', 'architecture', 'archeology'];
    const existingDimensions = project.sections
      .filter(sec => sec._id.toString() !== sectionId)
      .map(sec => sec.dimension);

    if (dimension) {
      if (restrictedDimensions.includes(dimension)) {
        if (existingDimensions.includes(dimension)) {
          return res.status(400).json({ message: `Section with dimension '${dimension}' already exists.` });
        }
      } else {
        if (existingDimensions.some(dim => !restrictedDimensions.includes(dim))) {
          return res.status(400).json({ message: 'Custom section already exists.' });
        }
      }
      section.dimension = dimension;
    }

    if (title) section.title = title;
    if (content) section.content = content;

    await project.save();

    res.status(200).json({ message: 'Section updated', section });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;