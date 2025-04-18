const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const User = require('../models/User');
const Annotation = require('../models/annotation');

// search by firstname,lastname, email , a word from the title or description
router.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required.' });
  }

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive

    // 1️⃣ Search Projects by title or description
    const projectsByContent = await Project.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    // 2️⃣ Find user by name, surname, or email
    const users = await User.find({
      $or: [
        { firstname: { $regex: regex } },
        { lastname: { $regex: regex } },
        { email: { $regex: regex } }
      ]
    });
    // it appear all the project, sections , annotation that a user have done
    let projectsByUser = [];
    let projectsBySectionAuthor = [];
    let projectsByAnnotation = [];
    
    for (const user of users) {
      // 3️⃣ Projects created by the user
      const userProjects = await Project.find({ author: user._id });
      projectsByUser.push(...userProjects);
    
      // 4️⃣ Projects where user added a section
      const sectionProjects = await Project.find({ 'sections.author': user._id });
      projectsBySectionAuthor.push(...sectionProjects);
    
      // 5️⃣ Annotations by user
      const annotations = await Annotation.find({ user: user._id }).select('project');
    
      const annotatedProjectIds = [...new Set(annotations.map(a => a.project.toString()))];
    
      const annotationProjects = await Project.find({
        _id: { $in: annotatedProjectIds }
      });
    
      projectsByAnnotation.push(...annotationProjects);
    }
    

    // 🧩 Combine all unique projects
    const allProjects = [
      ...projectsByContent,
      ...projectsByUser,
      ...projectsBySectionAuthor,
      ...projectsByAnnotation
    ];

    // ✅ Filter duplicates using a Map
    const uniqueProjectsMap = new Map();
    allProjects.forEach(project => uniqueProjectsMap.set(project._id.toString(), project));

    const uniqueProjects = Array.from(uniqueProjectsMap.values());

    res.status(200).json({ results: uniqueProjects });
  } catch (error) {
    console.error('❌ Search Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
