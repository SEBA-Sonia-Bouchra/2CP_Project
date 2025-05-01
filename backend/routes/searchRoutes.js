const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const User = require('../models/User');
const Annotation = require('../models/annotation');

// Search by firstname, lastname, email, a word from the title, or description
router.get('/', async (req, res) => {
  const query = req.query.q;

  // Handle empty query by returning all projects
  if (!query || query.trim() === '') {
    try {
      const allProjects = await Project.find({}).populate('author', 'firstname lastname');
      return res.status(200).json(allProjects);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive

    // 1️⃣ Search Projects by title or description
    const projectsByContent = await Project.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    }).populate('author', 'firstname lastname');

    // 2️⃣ Find user by name, surname, or email
    const users = await User.find({
      $or: [
        { firstname: { $regex: regex } },
        { lastname: { $regex: regex } },
        { email: { $regex: regex } }
      ]
    });

    let projectsByUser = [];
    let projectsBySectionAuthor = [];
    let projectsByAnnotation = [];
    
    for (const user of users) {
      // 3️⃣ Projects created by the user
      const userProjects = await Project.find({ author: user._id })
        .populate('author', 'firstname lastname');
      projectsByUser.push(...userProjects);
    
      // 4️⃣ Projects where user added a section
      const sectionProjects = await Project.find({ 'sections.author': user._id })
        .populate('author', 'firstname lastname');
      projectsBySectionAuthor.push(...sectionProjects);
    
      // 5️⃣ Annotations by user
      const annotations = await Annotation.find({ user: user._id }).select('project');
      const annotatedProjectIds = [...new Set(annotations.map(a => a.project.toString()))];
      const annotationProjects = await Project.find({ _id: { $in: annotatedProjectIds } })
        .populate('author', 'firstname lastname');
      projectsByAnnotation.push(...annotationProjects);
    }
    
    // Combine all unique projects
    const allProjects = [
      ...projectsByContent,
      ...projectsByUser,
      ...projectsBySectionAuthor,
      ...projectsByAnnotation
    ];

    // Filter duplicates using a Map
    const uniqueProjectsMap = new Map();
    allProjects.forEach(project => uniqueProjectsMap.set(project._id.toString(), project));

    const uniqueProjects = Array.from(uniqueProjectsMap.values());

    res.status(200).json(uniqueProjects); // Changed to return array directly
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;