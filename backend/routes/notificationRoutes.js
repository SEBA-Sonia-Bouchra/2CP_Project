const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Destructured functions from notificationController
const { 
  requestEditNotification, 
  respondEditNotification, 
  annotationAddedNotification, 
  reportConflictNotification, 
  getNotifications, 
  markAsRead, 
  deleteNotification 
} = notificationController;

// Route for requesting an edit notification
router.post('/request-edit', requestEditNotification);

// Route for responding to edit request notification
router.put('/respond-edit', respondEditNotification);

// Route for adding an annotation notification
router.post('/annotation', annotationAddedNotification);

// Route for reporting a conflict notification
router.post('/conflict', reportConflictNotification);

// Route for fetching notifications for a user
router.get('/user/:userId', getNotifications);

// Route for marking a notification as read
router.put('/read/:id', markAsRead);

// Route for deleting a notification
router.delete('/delete/:id', deleteNotification);

// (Optional) If you need to emit edit-request notifications using socket
router.post('/edit-request', (req, res) => {
  notificationController.requestEditNotification(req, res, req.app.get('io'));
});

module.exports = router;
