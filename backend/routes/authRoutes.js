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
const authenticateUser = require('../middleware/authUser');
require("dotenv").config();
const rateLimit = require('express-rate-limit');

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
        subject: "Your verification code",
        html: `
            <p>Your verification code is: <strong>${otp}</strong></p>
            <p>It will expire in <strong>10 minutes</strong>.</p>
            <p>Please do not share this code with anyone.</p>
            <hr>
            <p style="font-size:16px; font-weight:bold;">BinaA-بناء</p>
            <p style="font-style:italic;">"Preserve Algerian architectural heritage"</p>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending OTP email:", error);
        } else {
          console.log("OTP email sent:", info.response);
        }
      });
};

const otpResendLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 1, // 1 request per window per user
  message: "Too many OTP requests. Please try again in 30 seconds."
});

// ✅ Signup Route
router.post("/signup", upload.single("certificate"), async (req, res) => {
    try {
        const { firstname, lastname , email, password, isProfessional, institution, role } = req.body;

        if (email === process.env.EMAIL_USER) {
            return res.status(400).json({ message: "You cannot sign up with this email address." });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "There's already an account with this email address" });

        if (password.length < 8) return res.status(400).json({ message: "Password too short!" });

        if (isProfessional === 'true') {
            if (!req.file) {
                return res.status(400).json({ message: "Professionals must upload a certificate." });
            }
            if (!institution || !role) {
                return res.status(400).json({ message: "Professionals must provide their institution and role." });
            }
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
            institution: isProfessional? institution : null,
            role: isProfessional? role : null,
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

router.post('/resend-otp', otpResendLimiter, async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required to resend OTP." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    sendOtpEmail(user.email, otp);
    res.status(200).json({ message: "OTP has been resent successfully." });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Server error. Please try again." });
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
        console.log("Stored OTP:", user.otp, "Received OTP:", otp);
        console.log("Stored Expiry:", user.otpExpires, "Current Time:", Date.now());

        // Convert both OTPs to string before comparing
        const cleanedOtp = otp.trim().toString();
        if (user.otp.toString() !== cleanedOtp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired verification code!" });
        }
        user.isVerified = true;

        await user.save();
        return res.status(200).json({ message: "code is verified successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ Approve/Reject Route using POST
// router.post("/approve", async (req, res) => {
//     try {
//         const { userId, action } = req.body; // Get user ID and action from request body

//         if (!userId || !action) {
//             return res.status(400).json({ message: "User ID and action are required!" });
//         }

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found!" });
//         }

//         if (action === "accept") {
//             user.status = "accepted";
//         } else if (action === "reject") {
//             user.status = "rejected";
//         } else {
//             return res.status(400).json({ message: "Invalid action! Use 'accept' or 'reject'. Please log in." });
//         }

//         await user.save();
//         return res.json({ message: `User ${userId} has been ${action}ed successfully.` });

//     } catch (error) {
//         console.error("Error in approval route:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

router.post("/approve", authenticateUser, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Only admins can perform this action." });
        }

        const { userId, action } = req.body;
        if (!userId || !action) {
            return res.status(400).json({ message: "User ID and action are required!" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

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
        const certificateUrl = `http://localhost:5000/api/auth/certificates/${user.certificateUrl}`;

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

        if (!user) return res.status(400).json({ message: "No account was found with the provided information." });
        if (!user.isVerified) return res.status(400).json({ message: " Your account hasn't been verified yet. Please check your email for a verification link." });
        if (user.status == "pending") return res.status(400).json({ message: "Your registration is currently under admin review." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Email or password is incorrect. Please check and try again." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login successful!", token, status: user.status });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}); 
// ✅ Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No account was found with the provided information." });
        }

        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 2 minutes

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
            subject: "Password reset verification code",
            text: `Your verification code for password reset is: ${otp}. It is valid for 10 minutes.`,
        });

        res.status(200).json({ message: "verification code sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
 
// ✅  Route for Reset Password
router.post("/reset-password", async (req, res) => {
    const {email, newPassword, confirmPassword } = req.body;


    try {
        const user = await User.findOne({email}); 
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Ensure new password and confirmation match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
);

router.post("/verify-reset-password", async (req, res) => {
    const { email, otp } = req.body;
    console.log("Received Email:", email);
    console.log("Received OTP:", otp);
    const user = await User.findOne({ email });
  
    if (!user) return res.status(404).json({ message: "User not found" });
  
    if (user.resetOTP !== otp) {
        return res.status(400).json({ message: "The verification code you entered is invalid. Please check and try again." });
    }
    if(Date.now() > user.otpExpires) {
        return res.status(400).json({ message: "This verification code has expired. Please request a new one to continue." });
    }

    user.resetOTP = undefined;
    user.otpExpires = undefined;
    await user.save();
  
    res.status(200).json({ message: "verification code verified successfully" });
  });

// ✅ Admin Route: Get All Pending Users
router.get("/pending-users", async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: "pending", isVerified: true });
        res.json(pendingUsers);
    } catch (error) {
        console.error("Error fetching pending users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Get User Status by Email
router.post("/check-status", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ status: user.status });
    } catch (error) {
        console.error("Error checking user status:", error);
        res.status(500).json({ message: "Server error" });
    }
});

 
// GET /me - return logged in user info
router.get('/me', authenticateUser, async (req, res) => {
    res.json(req.user); // Comes from middleware
  });

module.exports = router;