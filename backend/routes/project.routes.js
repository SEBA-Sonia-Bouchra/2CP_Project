const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');

router.get('/auth/google', controller.googleAuth);
router.get('/auth/google/callback', controller.googleAuthCallback);
router.get('/download/:projectId/:fileType', controller.downloadProject);
router.post('/upload/:projectId/:fileType', controller.uploadToUserDrive);

module.exports = router;
