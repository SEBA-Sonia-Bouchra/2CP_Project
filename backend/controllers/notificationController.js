const Notification = require("../models/Notification");
const User = require('../models/User');
const Project = require('../models/Project');

// Request Edit Notification
const requestEditNotification = async (req, res) => {
  const { projectId, requesterId, ownerId, projectName, requesterName } = req.body;

  try {
    const newNotification = new Notification({
      projectId,
      requesterId,
      ownerId,
      projectName,
      requesterName,
      message: `${requesterName} wants to edit your project '${projectName}'.`,
      type: 'edit-request',
      isRead: false
    });

    await newNotification.save();

    req.io.to(ownerId).emit('edit-request-received', {
      message: newNotification.message,
      projectId,
      requesterName,
      projectName
    });

    res.status(201).json(newNotification);
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json({ message: 'Error creating notification', error: err });
  }
};

// Get Notifications
const getNotifications = async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await Notification.find({
      $or: [
        { ownerId: userId },
        { requesterId: userId },
        { sectionWriterId: userId }
      ]
    }).sort({ createdAt: -1 });

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err });
  }
};

// Respond to Edit Request Notification
const respondEditNotification = async (req, res) => {
  const { projectId, ownerId, requesterId, projectName, status } = req.body;

  try {
    const notification = await Notification.findOneAndUpdate(
      { projectId, requesterId, ownerId, type: 'edit-request' },
      {
        status,
        message: `Your request to edit the project '${projectName}' has been ${status} by the owner.`
      },
      { new: true }
    );

    if (notification) {
      req.io.to(requesterId).emit('edit-request-response', {
        message: notification.message,
        projectId,
        projectName,
        status
      });

      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating notification', error: err });
  }
};

// Annotation Added Notification
const annotationAddedNotification = async (req, res) => {
  const { projectId, annotationId, ownerId, sectionWriterId, projectName } = req.body;

  try {
    const message = `A new annotation has been added to your project '${projectName}'.`;

    const newNotification = new Notification({
      projectId,
      ownerId,
      sectionWriterId,
      projectName,
      message,
      type: 'annotation',
      isRead: false
    });

    await newNotification.save();

    req.io.to(ownerId).emit('annotation-added', { message, projectId, projectName });
    req.io.to(sectionWriterId).emit('annotation-added', { message, projectId, projectName });

    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: 'Error creating annotation notification', error: err });
  }
};

// Conflict Reported Notification
const reportConflictNotification = async (req, res) => {
  const { projectId, ownerId, sectionWriterId, projectName } = req.body;

  try {
    const message = `A conflict has been reported on your project '${projectName}'.`;

    const newNotification = new Notification({
      projectId,
      ownerId,
      sectionWriterId,
      projectName,
      message,
      type: 'conflict',
      isRead: false
    });

    await newNotification.save();

    req.io.to(ownerId).emit('conflict-reported', { message, projectId, projectName });
    req.io.to(sectionWriterId).emit('conflict-reported', { message, projectId, projectName });

    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: 'Error creating conflict notification', error: err });
  }
};

// Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: 'Error marking notification as read', error: err });
  }
};

// Delete Notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting notification', error: err });
  }
};

module.exports = {
  requestEditNotification,
  respondEditNotification,
  annotationAddedNotification,
  reportConflictNotification,
  getNotifications,
  markAsRead,
  deleteNotification
};
