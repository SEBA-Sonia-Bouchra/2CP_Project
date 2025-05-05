require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require("path");

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const annotationRoutes = require('./routes/annotationRoutes');
const searchRoutes = require('./routes/searchRoutes');
const filterSearchRoutes = require('./routes/filterSearch');
const seedAdmin = require("./utils/seedAdmin");
const homepageRoutes = require('./routes/homepageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const conflictRoutes = require('./routes/conflict');
const downloadRoute = require('./routes/project.routes'); 
const notificationRoutes = require('./routes/notificationRoutes');
const editRequestRoutes = require('./routes/editreqRoutes'); 
const approveeditreqRoutes = require('./routes/approveeditreqRoutes');
const { googleAuth, googleAuthCallback } = require('./controllers/project.controller');

const app = express();

// Debug JWT_SECRET and Mongo URI
console.log("🔹 JWT_SECRET:", process.env.JWT_SECRET);
console.log("🔹 MONGO_URI:", process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes); 
app.use('/api/annotations', annotationRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/filter', filterSearchRoutes);
app.use("/api/profile", profileRoutes);
app.use('/homepage', homepageRoutes);//here it is in my server
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/conflict', conflictRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/download', downloadRoute); 
app.use('/api/editrequests', editRequestRoutes);
app.use('/api/approveeditreqest', approveeditreqRoutes);
app.use('/api/conflict', conflictRoutes);

// Debugging: Show Registered Routes
console.log("✅ Registered Routes:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`   🔹 ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // 30 seconds timeout
})
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    seedAdmin()
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if the connection fails
  });

// Handle Undefined Routes (404)
app.use((req, res) => {
    res.status(404).json({ error: "❌ Route Not Found" });
});

// Test Route
app.get('/', (req, res) => {
    res.send("Welcome to Projet_2CP API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


