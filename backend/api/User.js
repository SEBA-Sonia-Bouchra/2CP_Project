const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
require("dotenv").config();

// ✅ Ensure upload directories exist
const uploadDir = "uploads/certificates";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ Serve uploaded certificates
router.use("/certificates", express.static(uploadDir));

// ✅ Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ Function to send OTP email
const sendOtpEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        html: `
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>It will expire in <strong>10 minutes</strong>. Please do not share this code with anyone.</p>
            <hr>
            <p style="font-size:16px; font-weight:bold;">BinaA-بناء</p>
            <p style="font-style:italic;">"Preserve Algerian architectural heritage"</p>
        `,
    };
    transporter.sendMail(mailOptions);
};



// ✅ Signup Route
router.post("/signup", upload.single("certificate"), async (req, res) => {
    try {
        const { firstname, lastname , email, password, isProfessional } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists!" });

        if (password.length < 8) return res.status(400).json({ message: "Password too short!" });

        if (isProfessional === 'true' && !req.file) {
            return res.status(400).json({ message: "Professionals must upload a certificate" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isProfessional: isProfessional === 'true',
            certificateUrl: req.file ? req.file.filename : null,
            otp,
            otpExpires,
            isVerified: false,
            status: "pending"
        });

        await user.save();
        sendOtpEmail(user.email, otp);
        res.status(201).json({ message: "User registered! Check email for OTP." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        console.log("Request Body:", req.body);

        // Ensure email is trimmed and in lowercase
        const user = await User.findOne({ email: email.trim().toLowerCase() });

        console.log("User found:", user);

        if (!user) return res.status(400).json({ message: "User not found!" });
        if (user.isVerified) return res.status(400).json({ message: "User already verified!" });

        console.log("Stored OTP:", user.otp, "Received OTP:", otp);
        console.log("Stored Expiry:", user.otpExpires, "Current Time:", Date.now());

        // Convert both OTPs to string before comparing
        if (user.otp.toString() !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP!" });
        }

        user.isVerified = true;
        await user.save();

        sendAdminApprovalEmail(user.email, user.certificateUrl);
        res.json({ message: "OTP verified! Waiting for admin approval." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ Approve/Reject Route using POST
router.post("/approve", async (req, res) => {
    try {
        const { userId, action } = req.body; // Get user ID and action from request body

        if (!userId || !action) {
            return res.status(400).json({ message: "User ID and action are required!" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (action === "accept") {
            user.status = "accepted";
        } else if (action === "reject") {
            user.status = "rejected";
        } else {
            return res.status(400).json({ message: "Invalid action! Use 'accept' or 'reject'." });
        }

        await user.save();
        return res.json({ message: `User ${userId} has been ${action}ed successfully.` });

    } catch (error) {
        console.error("Error in approval route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// ✅ Get Certificate by POST Request
router.post("/get-certificate", async (req, res) => {
    try {
        const { userId } = req.body; // Get user ID from request body

        if (!userId) {
            return res.status(400).json({ message: "User ID is required!" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (!user.certificateUrl) {
            return res.status(404).json({ message: "No certificate found for this user!" });
        }

        // Construct the full URL to access the certificate
        const certificateUrl = `http://localhost:5000/api/user/certificates/${user.certificateUrl}`;

        res.json({ certificateUrl });

    } catch (error) {
        console.error("Error fetching certificate:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found!" });
        if (!user.isVerified) return res.status(400).json({ message: "User not verified!" });
        if (user.status !== "accepted") return res.status(400).json({ message: "Admin approval pending!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful!", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}); 
// ✅ Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = Date.now() + 2 * 60 * 1000; // OTP valid for 2 minutes

        // Save OTP and expiration in the database
        user.resetOTP = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // ✅ Set up email transporter using .env credentials
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS  // Your app password
            }
        });

        // ✅ Send OTP via email
        await transporter.sendMail({
            from: `"BinaA Team" <${process.env.EMAIL_USER}>`, 
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It is valid for 2 minutes.`,
        });

        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
// ✅  Route for Forgot Password
router.post("/forgot-password", forgotPassword);


// ✅  Reset password 
const resetPassword = async (req, res) => {
    const { email, otp, newPassword, confirmPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP is valid and not expired
        if (user.resetOTP !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Ensure new password and confirmation match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Remove the OTP fields from the database
        user.resetOTP = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}; 
// ✅  Route for Reset Password
router.post("/reset-password", resetPassword);



module.exports = router;