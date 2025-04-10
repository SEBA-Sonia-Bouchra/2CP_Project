const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isProfessional: { type: Boolean, default: false },
    institution: { type: String },

    // ✅ OTP for Signup Verification
    otp: { type: String },  
    otpExpires: { type: Date },

    // ✅ OTP for Forgot Password
    resetOTP: { type: String },  
    resetOtpExpires: { type: Date }, 

    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    certificateUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
