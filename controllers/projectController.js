const mongoose = require("mongoose");
const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const { title, description, /*category, region,*/ sections, references } = req.body;

    // 🚀 Step 1: Make sure req.user exists
    if (!req.user || !req.user.userId) {
      console.error("❌ req.user is undefined or missing userId:", req.user);
      return res.status(401).json({ error: "Unauthorized: No user attached to request" });
    }

    console.log("✅ Extracted User ID from Token:", req.user.userId);

    // 🚀 Step 2: Convert the userId to ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    console.log("🆔 Converted User ID:", userId);

    // 🚀 Step 3: Find the user in MongoDB
    const user = await User.findById(userId);

    if (!user) {
      console.error("❌ User not found in database for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ User Found:", user);

    // 🚀 Step 4: Check if user is a pro user
    if (user.role !== "pro user") {
      return res.status(403).json({ error: "Only pro users can create projects" });
    }

    // 🚀 Step 5: Handle file uploads
    const coverPhoto = req.files?.coverPhoto?.[0]?.path || null;
    const mediaFiles = req.files?.media?.map(file => file.path) || [];

    console.log("📂 Uploaded Cover Photo:", coverPhoto);
    console.log("📂 Uploaded Media Files:", mediaFiles);

    // 🚀 Step 6: Parse sections
    let parsedSections = [];
    try {
      parsedSections = sections ? JSON.parse(sections) : [];
      if (!Array.isArray(parsedSections)) {
        throw new Error("Invalid format: 'sections' must be an array.");
      }

      // Validate each section
      parsedSections = parsedSections.map(section => {
        if (!section.title || !section.content || !section.dimension) {
          throw new Error("Each section must have a title, content, and dimension.");
        }
        if (typeof section.dimension !== 'string' || section.dimension.trim() === '') {
          throw new Error(`Invalid dimension. It must be a non-empty string.`);
        }
        
        return section;
      });

    } catch (error) {
      return res.status(400).json({ error: "Invalid 'sections' format. Must be a JSON array with valid fields.", details: error.message });
    }

    // 🚀 Step 7: Parse references
    let parsedReferences = [];
    try {
      parsedReferences = references ? JSON.parse(references) : [];
      if (!Array.isArray(parsedReferences)) {
        throw new Error("Invalid format: 'references' must be an array.");
      }

      // Validate each reference
      parsedReferences = parsedReferences.map(ref => {
        if (!ref.title) {
          throw new Error("Each reference must have a title.");
        }
        return ref;
      });

    } catch (error) {
      return res.status(400).json({ error: "Invalid 'references' format. Must be a JSON array with valid fields.", details: error.message });
    }

    // 🚀 Step 8: Create the new project
    const newProject = new Project({
      title,
      description,
      author: userId,
      //category,
      //region,
      coverPhoto,
      media: mediaFiles,
      sections: parsedSections,
      references: parsedReferences,
      dateOfPublish: new Date(),
    });

    await newProject.save();

    console.log("✅ Project Created Successfully:", newProject);

    return res.status(201).json({ message: "Project created successfully!", project: newProject });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};

