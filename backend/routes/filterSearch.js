const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const wilayas = require('../models/wilayas');

//by region...
router.get('/region', async (req, res) => {
    const { region } = req.query;
  
    if (!region) {
      return res.status(400).json({ message: 'Region is required.' });
    }
  
    // Case-insensitive check
    const normalizedRegion = region.trim().toLowerCase();
    const matchedWilaya = wilayas.find(
      (w) => w.toLowerCase() === normalizedRegion
    );
  
    if (!matchedWilaya) {
      return res.status(400).json({
        message: `Invalid region. Please choose one of the official wilayas.`,
        suggestions: wilayas,
      });
    }
  
    try {
      const regex = new RegExp(matchedWilaya, 'i');
      const projects = await Project.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { 'sections.content': { $regex: regex } },
          { 'sections.title': { $regex: regex } }
        ],
      }).populate('author', 'firstname lastname');
  
      res.status(200).json(projects); // Changed to return array directly
    } catch (error) {
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

//by category
const categorySuggestions = [
  'Architecture',
  'Archaeology',
  'History',
];

router.get('/category', async (req, res) => {
    const { category } = req.query;
  
    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }
  
    try {
      const regex = new RegExp(category, 'i'); 
      const projects = await Project.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { 'sections.content': { $regex: regex } },
          { 'sections.dimension': { $regex: regex } },
          { 'sections.title': { $regex: regex } }
        ]
      }).populate('author', 'firstname lastname');
  
      res.status(200).json(projects); // Changed to return array directly
    } catch (error) {
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
});
  
module.exports = router;