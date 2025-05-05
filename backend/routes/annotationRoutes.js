const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Annotation = require('../models/annotation');
const Project = require('../models/Project');
const authenticateUser = require('../middleware/authUser');
const { annotationAddedNotification } = require('../controllers/notificationController');

// 🟢 Create Annotation
router.post('/', authenticateUser, async (req, res) => {
  try {
    const user = req.user; // Ensure this exists
    console.log("User ID:", user?._id); // Debug

    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // ✅ Check if user is a Pro
    if (!user.isProfessional) {
      return res.status(403).json({ message: 'Only pro users can annotate sections.' });
    }

    const { content, projectId, sectionId, dimension } = req.body;

    if (!content || !projectId || !sectionId || !dimension) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const annotation = new Annotation({
      user: user._id, 
      firstname: user.firstname,
      lastname: user.lastname,
      content,
      project: projectId,
      sectionId,
      dimension  
    });


    await annotation.save();
    // 🔍 Find the section contributor
const section = project.sections.find(s => s._id.toString() === sectionId);
const sectionWriterId = section?.contributor?.toString();

// 🔔 Trigger annotation-added notification
await annotationAddedNotification(
  {
    body: {
      projectId,
      ownerId: project.author.toString(),
      sectionWriterId,
      projectName: project.title,
      annotatorName: `${user.firstname} ${user.lastname}`,
      annotationId: annotation._id,
      sectionId,
      userId: user._id // 👈 Pass the user ID explicitly
    },
    user: req.user,
    io: req.app.get('io')
  },
  {
    status: () => ({ json: () => {} }) // Dummy res to match expected signature
  }
);


    res.status(201).json({ message: 'Annotation created successfully.', annotation });
  } catch (error) {
    console.error('❌ Error creating annotation:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});


// ✅ DELETE Annotation Route (owner of annotation OR project can delete)
router.delete('/:annotationId', authenticateUser, async (req, res) => {
  try {
    const { annotationId } = req.params;


    const userIdFromToken = req.user.userId || (req.user._id && req.user._id.toString());

    if (!userIdFromToken) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found.' });
    }

    // 1️⃣ Find the annotation
    const annotation = await Annotation.findById(annotationId);

    if (!annotation) {
      return res.status(404).json({ message: 'Annotation not found.' });
    }

    const annotationOwnerId = annotation.user.toString();
    const currentUserId = userIdFromToken;

    // 2️⃣ Find the project this annotation belongs to
    const project = await Project.findById(annotation.project);

    if (!project) {
      return res.status(404).json({ message: 'Associated project not found.' });
    }

    const projectOwnerId = project.author.toString();



    // 3️⃣ Check if current user is either the annotation owner or project owner
    if (annotationOwnerId !== currentUserId && projectOwnerId !== currentUserId) {
      return res.status(403).json({ message: 'Not authorized to delete this annotation.' });
    }

    // 4️⃣ Delete the annotation
    await Annotation.findByIdAndDelete(annotationId);

    return res.status(200).json({ message: 'Annotation deleted successfully.' });

  } catch (error) {
    console.error("❌ DELETE Annotation Error:", error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
});


// ✏️ Edit Annotation Route 
router.put('/:annotationId', authenticateUser, async (req, res) => {
  try {
    const { annotationId } = req.params;
    const { content } = req.body;
    //check if there's content
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content is required.' });
    }

    // find the annotation
    const annotation = await Annotation.findById(annotationId);
    if (!annotation) {
      return res.status(404).json({ message: 'Annotation not found.' });
    }

    //check the editor
    if (annotation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this annotation.' });
    }

    annotation.content = content;
    await annotation.save();

    res.status(200).json({ message: 'Annotation updated successfully.', annotation });

  } catch (error) {
    console.error('❌ Server Error Editing Annotation:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});


router.get('/project/:projectId/grouped', authenticateUser, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Ensure the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const annotations = await Annotation.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(projectId) } },

      // Join with User collection to get profilePicture
      {
        $lookup: {
          from: 'users', // Collection name (lowercase and plural of model by default)
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },

      {
        $group: {
          _id: '$sectionId',
          annotations: {
            $push: {
              _id: '$_id',
              sectionId: '$sectionId',
              user: '$user',
              firstname: '$firstname',
              lastname: '$lastname',
              content: '$content',
              createdAt: '$createdAt',
              updatedAt: '$updatedAt',
              dimension: '$dimension',
              profilePicture: '$userDetails.profilePicture'
            }
          }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.status(200).json({ groupedAnnotations: annotations });
  } catch (error) {
    console.error('Error fetching grouped annotations:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// get the contributer info for display purposes
router.get('/project/:projectId/section/:sectionId/contributor', async (req, res) => {
  const { projectId, sectionId } = req.params;

  try {
    // Validate ObjectId format (optional but recommended)
    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(sectionId)) {
      return res.status(400).json({ message: 'Invalid project or section ID format.' });
    }

    // Find the project by its ID and populate the sections along with contributor details
    const project = await Project.findById(projectId)
      .populate({
        path: 'sections.contributor',  // Populate the 'contributor' field in each section
        select: 'firstname lastname email profilePicture _id' 
      })
      .select('sections'); // Select only the 'sections' field to avoid unnecessary data

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Find the section that matches the given sectionId
    const section = project.sections.find(section => section._id.toString() === sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found.' });
    }

    // Check if the contributor exists
    if (!section.contributor) {
      return res.status(404).json({ message: 'Contributor not found.' });
    }

    // Send the contributor's info as a response
    res.status(200).json({
      contributor: section.contributor,
    });
  } catch (error) {
    console.error('Error fetching contributor info:', error); // Log full error details
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});


module.exports = router;