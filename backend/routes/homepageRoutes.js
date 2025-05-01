const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/MyprojectsMycontribCnotroller');



// Get all projects for a user (view)
router.get('/', homepageController.getpageProjects);//this is what i want
// Route to get owned projects
//router.get('/owned-projects', homepageController.getOwnedProjects);

// Route to get contributed projects
//router.get('/contributed-projects', homepageController.getContributedProjects);

// Edit project details (only for the owner)
router.put('/:projectId/edit', homepageController.editProject);

// Delete a project (only for the owner)
router.delete('/:projectId',homepageController.deleteProject);
router.get('/Home', homepageController.getHomeProjects); 


module.exports = router;
