const bcrypt = require("bcrypt");
const User = require("../models/User");

async function seedAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "binaateam.dz@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("ptmffqf3", 10);

    const admin = new User({
      firstname: "Admin",
      lastname: "Binaa",
      email: "binaateam.dz@gmail.com",
      password: hashedPassword,
      isAdmin: true,
      isProfessional: false,
      isVerified: true,
      status: "accepted",
    });

    await admin.save();
    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
}

module.exports = seedAdmin;
