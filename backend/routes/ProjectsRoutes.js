const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/projects.controller');

// Get all projects for a user (view)
router.get('/:userId', homepageController.getMyProjects);

// Edit project details (only for the owner)
router.put('/:projectId/edit', homepageController.editProject);

// Delete a project (only for the owner)
router.delete('/:projectId', homepageController.deleteProject);

module.exports = router;
