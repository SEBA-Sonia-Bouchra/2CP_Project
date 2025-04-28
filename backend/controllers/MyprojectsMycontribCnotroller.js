const Project = require('../models/Project');
const Annotation = require('../models/annotation');
const jwt = require('jsonwebtoken');

/*// Helper function to tag projects with the user's role
const tagProjectsWithRole = (projects, userId) =>
  projects.map(project => ({
    ...project.toObject(),
    role: project.owner.toString() === userId ? 'owner' : 'contributor'
  }));*/

// Controller for getting homepage projects


exports.getpageProjects = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token:", token); // Check if the token is being sent correctly

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    // 1. Projects owned by the user
    const ownedProjects = await Project.find({author : userId })
    /*.populate({
      path: 'author',
      select: 'firstname lastname' // Explicitly select these fields
    });*/
    
    console.log(ownedProjects);
    // 2. Projects where user is a contributor (not owner)
      const contributedProjects = await Project.find({
       "sections.contributor": userId,
        author: { $ne: userId }
      })
      /*.populate({
        path: 'author',
        select: 'firstname lastname' // Explicitly select these fields
      });*/
      console.log(contributedProjects);


    
   
    // 3. Projects where user has annotations (not owner)
    const annotatedProjectIds = await Annotation.distinct('project', { user: userId });
    const annotatedProjects = await Project.find({
      _id: { $in: annotatedProjectIds },
      author: { $ne: userId }
    });

    // ✅ Send the flat array to frontend
    res.status(200).json({
      ownedProjects,
      contributedProjects,
      annotatedProjects
    });

  } catch (error) {
    console.error(error); // Log the error
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// Controller for editing a project (only for the owner)
exports.editProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId, title, description, contributors } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    // Check if the user is the owner
    if (project.author.toString() !== userId) {
      return res.status(403).send('Unauthorized: Only the owner can edit the project');
    }

    // Update project details
    project.title = title || project.title;
    project.description = description || project.description;
    project.contributors = contributors || project.contributors;

    // Save the updated project
    await project.save();

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Error editing project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for deleting a project (only for the owner)
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    // Check if the user is the owner
    if (project.owner.toString() !== userId) {
      return res.status(403).send('Unauthorized: Only the owner can delete the project');
    }

    // Delete the project
    await Project.deleteOne({ _id: projectId });
    res.status(200).send('Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
