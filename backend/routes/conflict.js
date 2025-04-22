const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Annotation = require('../models/annotation');
const User = require('../models/User');
const authenticateUser = require('../middleware/authUser');
const sendEmail = require('../models/sendEmail'); // Your email sending function

// 📩 Conflict Report Route
router.post('/report', authenticateUser, async (req, res) => {
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
    }

    return res.status(200).json({ message: 'Conflict reported and emails sent successfully.' });

  } catch (error) {
    console.error('❌ Conflict Report Error:', error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
