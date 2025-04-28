const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');

router.get('/auth/google', controller.googleAuth);
router.get('/auth/google/callback', controller.googleAuthCallback);
router.get('/:projectId/:fileType', controller.downloadProject);
router.post('/:projectId/:fileType', controller.uploadToUserDrive);

module.exports = router;
