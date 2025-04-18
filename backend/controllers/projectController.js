const mongoose = require("mongoose");
const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const { title, description, sections, references } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: No user attached to request" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user.isProfessional == 'false') {    //change structur
      return res.status(403).json({ error: "Only pro users can create projects" });
    }

    const coverPhoto = req.files?.coverPhoto?.[0]?.path || null;
    const mediaFiles = req.files?.media?.map(file => file.path) || [];

    
    let parsedSections = [];
    try {
      parsedSections = sections ? JSON.parse(sections) : [];
      if (!Array.isArray(parsedSections)) {
        throw new Error("Invalid format: 'sections' must be an array.");
      }

      const allowedFixedDimensions = ['historical', 'architectural', 'archaeological'];
      const usedDimensions = new Set();

      parsedSections = parsedSections.map(section => {
        const { title, content, dimension } = section;

        if (!title || !content || !dimension) {
          throw new Error("Each section must have a title, content, and dimension.");
        }

        const dimLower = dimension.trim().toLowerCase();

        if (allowedFixedDimensions.includes(dimLower)) {
          if (usedDimensions.has(dimLower)) {
            throw new Error(`Duplicate section dimension: '${dimLower}' is already used.`);
          }
          usedDimensions.add(dimLower);
        } else {
          // Custom dimension: cannot be one of the fixed ones
          if (allowedFixedDimensions.includes(dimLower)) {
            throw new Error(`Custom section dimension '${dimension}' cannot be one of the fixed dimensions.`);
          }
        }

        return {
          title,
          content,
          dimension
        };
      });

      if (parsedSections.length > 4) {
        throw new Error("A project can have a maximum of 4 sections.");
      }

    } catch (error) {
      return res.status(400).json({ error: "Invalid 'sections' format or rule violation.", details: error.message });
    }

    // --- Parse References ---
    let parsedReferences = [];
    try {
      parsedReferences = references ? JSON.parse(references) : [];
      if (!Array.isArray(parsedReferences)) {
        throw new Error("Invalid format: 'references' must be an array.");
      }

      parsedReferences = parsedReferences.map(ref => {
        if (!ref.title) {
          throw new Error("Each reference must have a title.");
        }
        return ref;
      });

    } catch (error) {
      return res.status(400).json({ error: "Invalid 'references' format.", details: error.message });
    }

    // --- Create Project ---
    const newProject = new Project({
      title,
      description,
      author: userId,
      coverPhoto,
      media: mediaFiles,
      sections: parsedSections,
      references: parsedReferences,
      dateOfPublish: new Date(),
    });

    await newProject.save();

    return res.status(201).json({ message: "Project created successfully!", project: newProject });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};

