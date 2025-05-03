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
/*const annotationAddedNotification = async (req, res) => {
  const { 
    projectId, 
    ownerId, 
    sectionWriterId, 
    projectName,
    annotatorName,
    annotationId,
    sectionId,
    userId // 👈 Now comes from req.body
  } = req.body;

  try {
if (ownerId) {
  console.log("👔 Creating notification for owner:", ownerId);
  const ownerNotification = new Notification({
    recipientId: ownerId,
    senderId:  userId,  // 👈 Annotator's user ID
    senderName: annotatorName,
    projectId,
    projectName,
    annotationId,
    sectionId,
    type: 'annotation',
    isRead: false
  });
  await ownerNotification.save();
}
// Notification for section writer (if different from owner)
if (sectionWriterId && sectionWriterId !== ownerId) {
  const writerNotification = new Notification({
    recipientId: sectionWriterId,
    senderId: userId,
    senderName: annotatorName,
    projectId,
    projectName,
    annotationId,
    sectionId,
    type: 'annotation',
    isRead: false
  });

await writerNotification.save();
console.log("💾 Section writer notification saved:", writerNotification);
}
res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error creating annotation notification:', err);
    res.status(500).json({ 
      message: 'Error creating annotation notification', 
      error: err.message 
    });
  }
};*/
const annotationAddedNotification = async (req, res) => {
  const { 
    projectId, 
    ownerId, 
    sectionWriterId, 
    projectName,
    annotatorName,
    annotationId,
    sectionId,
    userId
  } = req.body;

  try {
    // ✅ Notification for project owner
    if (ownerId && userId.toString() !== ownerId.toString()) {
      console.log("👔 Creating notification for owner:", ownerId);
      const message = `${annotatorName} added a new annotation to "${projectName}"`;

      const ownerNotification = new Notification({
        recipientId: ownerId,
        senderId: userId,
        senderName: annotatorName,
        projectId,
        projectName,
        annotationId,
        sectionId,
        type: 'annotation',
        isRead: false,
        message
      });
      console.log("📤 Saving owner notification:", ownerNotification);
      await ownerNotification.save();
      console.log("✅ Owner notification saved");

      // 🔔 Emit real-time notification to owner
      if (req.io) {
        req.io.to(ownerId).emit('annotation-added', {
          projectId,
          projectName,
          annotationId,
          sectionId,
          from: annotatorName
        });
      }
    }

    // ✅ Notification for section writer if different
    if (
      sectionWriterId &&
      sectionWriterId.toString() !== ownerId.toString() &&
      sectionWriterId.toString() !== userId.toString()
    )  {
      const writerNotification = new Notification({
        recipientId: sectionWriterId,
        senderId: userId,
        senderName: annotatorName,
        projectId,
        projectName,
        annotationId,
        sectionId,
        type: 'annotation',
        isRead: false,
        message:`${annotatorName} added a new annotation to a section you're working on in ${projectName}`,
      });
      await writerNotification.save();
      console.log("💾 Section writer notification saved:", writerNotification);

      // 🔔 Emit real-time notification to section writer
      if (req.io) {
        req.io.to(sectionWriterId).emit('annotation-added', {
          projectId,
          projectName,
          annotationId,
          sectionId,
          from: annotatorName
        });
      }
    }

    res.status(201).json({ success: true });

  } catch (err) {
    console.error('❌ Error creating annotation notification:', err);
    res.status(500).json({ 
      message: 'Error creating annotation notification', 
      error: err.message 
    });
  }
};



const reportConflictNotification = async ({ recipientId, projectId, projectName, io }) => {
  try {
    const message = `A conflict has been reported on your project '${projectName}'.`;

    const newNotification = new Notification({
      projectId,
      recipientId,
      projectName,
      message,
      type: 'conflict',
      isRead: false,
      hasIo: true
    });

    await newNotification.save();

    // ✅ Check if io exists and has a 'to' method before emitting
    if (io && typeof io.to === 'function') {
      io.to(recipientId.toString()).emit('conflict-reported', {
        message,
        projectId,
        projectName
      });
      console.log(`📢 Real-time notification sent to user ${recipientId}`);
    } else {
      console.warn('⚠️ Socket.io instance not available. Skipped real-time notification.');
    }

    console.log(`🔔 Notification created for user ${recipientId} on project ${projectName}`);
  } catch (err) {
    console.error('❌ Error creating conflict notification:', err);
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
