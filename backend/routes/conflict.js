const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Annotation = require('../models/annotation');
const User = require('../models/User');
const authenticateUser = require('../middleware/authUser');
const sendEmail = require('../models/sendEmail'); // Your email sending function
const { reportConflictNotification } = require('../controllers/notificationController');

// 📩 Conflict Report Route
/*router.post('/report', authenticateUser, async (req, res) => {
  try {
    const { projectId, sectionId, annotationId, reason } = req.body;
    const sender = req.user; // User who sends the conflict

    console.log("🔹 Sender details:", sender);

    // Check if sender is professional
    if (!sender.isProfessional) {
      return res.status(403).json({ message: 'Only professional users can report conflicts.' });
    }

    // Check mandatory fields
    if (!projectId || !sectionId || !annotationId || !reason) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find project, section, annotation
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    const section = project.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: 'Section not found in the project.' });

    const annotation = await Annotation.findById(annotationId);
    if (!annotation) return res.status(404).json({ message: 'Annotation not found.' });

    // Check if annotation belongs to the correct project and section
    if (annotation.project.toString() !== projectId || annotation.sectionId !== sectionId) {
      return res.status(400).json({ message: 'Annotation does not match the given project or section.' });
    }

    // Prevent reporting your own annotation in your own section
    const isSectionOwner = section.author && section.author.toString() === sender._id.toString();
    const isAnnotationOwner = annotation.user.toString() === sender._id.toString();
    if (isSectionOwner && isAnnotationOwner) {
      return res.status(403).json({ message: 'You cannot report your own annotation in your own section.' });
    }

    // Prepare recipients
    const recipients = new Set();

    // Always notify project owner
    const projectOwner = await User.findById(project.author);
    if (projectOwner && projectOwner.email) {
      console.log('📋 Project Owner:', projectOwner.email);
      recipients.add(projectOwner.email);
    }

    // Always notify section owner
    if (section.author) {
      const sectionOwner = await User.findById(section.author);
      if (sectionOwner && sectionOwner.email) {
        console.log('📋 Section Owner:', sectionOwner.email);
        recipients.add(sectionOwner.email);
      }
    }

    // Notify annotation owner only if it's not the sender
    const annotationOwner = await User.findById(annotation.user);
    if (annotationOwner && annotationOwner.email && annotationOwner._id.toString() !== sender._id.toString()) {
      console.log('📋 Annotation Owner:', annotationOwner.email);
      recipients.add(annotationOwner.email);
    }

    // Remove the sender from the recipients list (if they are included)
    recipients.delete(sender.email);

    // Log final recipients
    console.log('📬 Final Recipients:', [...recipients]);

    if (recipients.size === 0) {
      return res.status(400).json({ message: 'No valid recipients to notify.' });
    }

    // Send emails using sendEmail function
    const subject = '📢 Conflict Reported on Your Content';
    const emailMessage = `Hello,

A conflict has been reported by ${sender.firstname} ${sender.lastname} (${sender.email}).

📌 Project: ${project.title}
📌 Section: ${section.title}
📌 Annotation Content: "${annotation.content}"

📝 Reason for conflict: "${reason}"

Please review the situation in the system.

Regards,
BinaA team`;

    // 🛠️ FIX: Make sure we are sending the right sender object
    const senderDetails = {
      firstname: sender.firstname || 'Unknown',
      lastname: sender.lastname || 'Unknown',
      email: sender.email || 'Unknown',
    };

    // Loop through recipients and send emails
    for (const recipient of recipients) {
      await sendEmail(recipient, subject, emailMessage, senderDetails);
      const user = await User.findOne({ email: recipient });

  if (user && user._id.toString() !== sender._id.toString()) {
    await reportConflictNotification({
      recipientId: user._id,
      projectId: project._id,
      projectName: project.title,
      io: req.io
    }, { status: () => ({ json: () => {} }) });
  }
  }

    return res.status(200).json({ message: 'Conflict reported and emails sent successfully.' });

  } catch (error) {
    console.error('❌ Conflict Report Error:', error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;*/
// 📩 Conflict Report Route
router.post('/report', authenticateUser, async (req, res) => {
  try {
    const { projectId, sectionId, annotationId, reason } = req.body;
    const sender = req.user;

    if (!sender.isProfessional) {
      return res.status(403).json({ message: 'Only professional users can report conflicts.' });
    }

    if (!projectId || !sectionId || !annotationId || !reason) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    const section = project.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: 'Section not found in the project.' });

    const annotation = await Annotation.findById(annotationId);
    if (!annotation) return res.status(404).json({ message: 'Annotation not found.' });

    if (annotation.project.toString() !== projectId || annotation.sectionId !== sectionId) {
      return res.status(400).json({ message: 'Annotation does not match the given project or section.' });
    }

    const isSectionOwner = section.author && section.author.toString() === sender._id.toString();
    const isAnnotationOwner = annotation.user.toString() === sender._id.toString();
    if (isSectionOwner && isAnnotationOwner) {
      return res.status(403).json({ message: 'You cannot report your own annotation in your own section.' });
    }

    // Find users
    const projectOwner = await User.findById(project.author);
    const sectionOwner = section.author ? await User.findById(section.author) : null;
    const annotationOwner = await User.findById(annotation.user);

    // 🔁 Collect unique email recipients
    const recipients = new Set();
    if (projectOwner?.email) recipients.add(projectOwner.email);
    if (sectionOwner?.email) recipients.add(sectionOwner.email);
    if (annotationOwner?.email && annotationOwner._id.toString() !== sender._id.toString()) {
      recipients.add(annotationOwner.email);
    }
    recipients.delete(sender.email); // Remove sender if present

    // 📨 Prepare email content
    const subject = '📢 Conflict Reported on Your Content';
    const emailMessage = `Hello,

A conflict has been reported by ${sender.firstname} ${sender.lastname} (${sender.email}).

📌 Project: ${project.title}
📌 Section: ${section.title}
📌 Annotation Content: "${annotation.content}"

📝 Reason for conflict: "${reason}"

Please review the situation in the system.

Regards,
BinaA team`;

    const senderDetails = {
      firstname: sender.firstname || 'Unknown',
      lastname: sender.lastname || 'Unknown',
      email: sender.email || 'Unknown',
    };

    // 🛑 Create a Set of user IDs to notify via system
    const notifiedUserIds = new Set();

    if (projectOwner && projectOwner._id.toString() !== sender._id.toString()) {
      notifiedUserIds.add(projectOwner._id.toString());
    }
    if (sectionOwner && sectionOwner._id.toString() !== sender._id.toString()) {
      notifiedUserIds.add(sectionOwner._id.toString());
    }
    if (annotationOwner && annotationOwner._id.toString() !== sender._id.toString()) {
      notifiedUserIds.add(annotationOwner._id.toString());
    }

    // 📨 Loop through recipients and send email + system notification
    for (const recipientEmail of recipients) {
      await sendEmail(recipientEmail, subject, emailMessage, senderDetails);

      const user = await User.findOne({ email: recipientEmail });
      if (user && notifiedUserIds.has(user._id.toString())) {
        await reportConflictNotification({
          recipientId: user._id,
          projectId: project._id,
          projectName: project.title,
          io: req.io
        }, { status: () => ({ json: () => {} }) });

        notifiedUserIds.delete(user._id.toString()); // Prevent double notification
      }
    }

    return res.status(200).json({ message: 'Conflict reported and notifications sent successfully.' });

  } catch (error) {
    console.error('❌ Conflict Report Error:', error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
