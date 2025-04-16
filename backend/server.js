require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); 

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB: Projet_2CP"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Import Routes
const userRoutes = require('./api/User'); // Adjust if necessary
app.use('/api/user', userRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send("Welcome to Projet_2CP API!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});









