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
  
    // uppercase check
    const normalizedRegion = region.trim().toLowerCase();
    const matchedWilaya = wilayas.find(
      (w) => w.toLowerCase() === normalizedRegion
    );
  //one of the 58 wilays
    if (!matchedWilaya) {
      return res.status(400).json({
        message: `Invalid region. Please choose one of the official wilayas.`,
        suggestions: wilayas,
      });
    }
  
    try {
      const regex = new RegExp(matchedWilaya, 'i');
      // search in discription and title of the project, in the content and title of the sections
      const projects = await Project.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { 'sections.content': { $regex: regex } },
          { 'sections.title': { $regex: regex } }
        ],
      });
  
      res.status(200).json({
        region: matchedWilaya,
        results: projects,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  });
  

//by category....
  //seggestiond for category
  const categorySuggestions = [
    'Architecture',
    'Archaeology',
    'History',
    /*'Culture',
    'Religious',
    'Colonial',
    'Modern',
    'Urbanism',
    'Traditional'*/
  ];
  
  router.get('/category', async (req, res) => {
    const { category } = req.query;
  
    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }
  
    try {
        
      const regex = new RegExp(category, 'i'); 
       // search in discription and title of the project, in the content and title of the sections also the dimention of the section
      const projects = await Project.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { 'sections.content': { $regex: regex } },
          { 'sections.dimension': { $regex: regex } },
          { 'sections.title': { $regex: regex } }
        ]
      });
  
      res.status(200).json({
        category,
        suggestions: categorySuggestions,
        results: projects
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  });
  
  
  module.exports = router;