const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Optional - used for edit requests
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  requesterName: {
    type: String
  },
  // Optional - used for annotation notifications
  sectionWriterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  annotationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Annotation'
  },

  // Shared
  projectName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['edit-request', 'annotation', 'conflict'],
    required: true
  },

  // Only for edit-request responses
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'none'],
    default: 'none'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
