const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepage.controller');

// Get all projects for a user (view)
router.get('/', homepageController.getHomepageProjects);//this is what i want

// Edit project details (only for the owner)
router.put('/:projectId/edit', homepageController.editProject);

// Delete a project (only for the owner)
router.delete('/:projectId', homepageController.deleteProject);

module.exports = router;
