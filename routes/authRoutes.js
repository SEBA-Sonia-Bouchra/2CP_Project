const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure correct path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Route
router.post('/register', async (req, res) => { 
    try {
        const { name, surname, email, password, role, affiliation } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            role,
            affiliation
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});






router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },  // Ensure payload is correct
        process.env.JWT_SECRET,                 // Secret key is correct
        { expiresIn: "1h" }                     // Check expiration time
    );
    
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  console.log("JWT_SECRET:", process.env.JWT_SECRET);


module.exports = router;








