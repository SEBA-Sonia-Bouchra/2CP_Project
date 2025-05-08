const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const User = require("../models/User");

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "uploads", "profile")); // Save images in "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("❌ Only image files are allowed"), false);
    }
};

// Set up Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Modify Profile Route (Now supports image upload)
router.put("/modify-profile", upload.single("profilePicture"), async (req, res) => {
    try {
        const { userId, firstname, lastname, description, levelOfExpertise } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "❌ User not found" });

        // Define update fields
        let updateFields = { firstname, lastname };

        // Handle profile picture upload
        if (req.file) {
            updateFields.profilePicture = `/uploads/profile/${req.file.filename}`;
        }

        // If the user is professional, allow additional updates
        if (user.isProfessional) {
            updateFields.description = description;
            updateFields.levelOfExpertise = levelOfExpertise;
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true }
        );

        res.json({ message: "✅ Profile updated successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: "❌ Server Error", error: error.message });
    }
});

// GET professional user profile by ID
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID and check if they are a professional
        const user = await User.findOne(
            { _id: userId, isProfessional: true },
            "firstname lastname description email role institution levelOfExpertise profilePicture"
        );

        if (!user) {
            return res.status(404).json({ message: "❌ Professional user not found" });
        }

        res.json({ message: "✅ Profile fetched successfully", profile: user });
    } catch (error) {
        res.status(500).json({ message: "❌ Server Error", error: error.message });
    }
});

module.exports = router;
