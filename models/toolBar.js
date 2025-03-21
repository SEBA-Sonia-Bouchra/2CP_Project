// routes/textRoutes.js
const express = require('express');
const router = express.Router();
const Text = require('../models/textSchema');  // ⬅ Import the Text model

// Save Text API
router.post('/save', async (req, res) => {
  const { content, history, projectId } = req.body;  // ⬅ Use projectId
  const newText = new Text({ description,  projectId });
  try {
    const savedText = await newText.save();
    res.status(201).json(savedText);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save content', error: error.message });
  }
});

// Update Text API
router.put('/update/:id', async (req, res) => {
  const { content, history } = req.body;
  try {
    const updatedText = await Text.findByIdAndUpdate(
      req.params.id,
      { content, history },
      { new: true }
    );
    res.status(200).json(updatedText);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update content', error: error.message });
  }
});

// Fetch Text by ID API
router.get('/get/:id', async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

module.exports = router;
