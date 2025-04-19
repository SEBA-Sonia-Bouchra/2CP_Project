const Project = require('../models/Project');
const Annotation = require('../models/annotation');

// Helper function to tag projects with the user's role
const tagProjectsWithRole = (projects, userId) =>
  projects.map(project => ({
    ...project.toObject(),
    role: project.owner.toString() === userId ? 'owner' : 'contributor'
  }));

// Controller for getting homepage projects
exports.getHomepageProjects = async (req, res) => {
  const userId = req.params.userId;

  try {
    // 🟢 1. Projects owned by the user
    const ownedProjects = await Project.find({ owner: userId });

    // 🟡 2. Projects where user is a contributor (but not owner)
    const contributedProjects = await Project.find({
      contributors: userId,
      owner: { $ne: userId }
    });

    const recentProjects = tagProjectsWithRole([...ownedProjects, ...contributedProjects], userId);

    // 🔵 3. Annotated sections (filter projects where user annotated a section)
    const annotatedSectionProjectIds = await Annotation.distinct('project', { user: userId });

    const annotatedProjects = await Project.find({
      _id: { $in: annotatedSectionProjectIds },
      owner: { $ne: userId }
    });

    const annotatedWithRole = tagProjectsWithRole(annotatedProjects, userId);

    res.json({
      recentProjects,
      annotatedProjects: annotatedWithRole
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
    if (project.owner.toString() !== userId) {
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
