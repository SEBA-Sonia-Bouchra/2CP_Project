require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch').default;
const chatbotRoutes = require('./routes/chatbotRoutes');
const verifyToken = require('./middleware/authMiddleware');


const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // Corrected import
const path = require("path");
const http = require("http");
const setupSocket = require("./socket");
const { Server } = require("socket.io");



// Import Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const annotationRoutes = require('./routes/annotationRoutes');
const searchRoutes = require('./routes/searchRoutes');
const filterSearchRoutes = require('./routes/filterSearch');
const homepageRoutes = require('./routes/homepageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const conflictRoutes = require('./routes/conflict');
const downloadRoute = require('./routes/project.routes');
const notificationRoutes = require('./routes/notificationRoutes');
const editRequestRoutes = require('./routes/editreqRoutes');
const approveeditreqRoutes = require('./routes/approveeditreqRoutes');


// Import Controllers
const { googleAuth, googleAuthCallback } = require('./controllers/project.controller');

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);
app.set("socketio", io);

// ===============================
// Configuration
// ===============================
const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // Corrected usage
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===============================
// MongoDB Connection
// ===============================
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
}).then(() => {
    console.log('✅ MongoDB Connected Successfully');
    require("./utils/seedAdmin")();
}).catch(error => {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
});


// ===============================
// Routes
// ===============================
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/annotations', annotationRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/filter', filterSearchRoutes);
app.use("/api/profile", profileRoutes);
app.use('/homepage', homepageRoutes);
app.use('/api/conflict', conflictRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/download', downloadRoute);
app.use('/api/editrequests', editRequestRoutes);
app.use('/api/approveeditreqest', approveeditreqRoutes);
app.use('/api/chat', verifyToken, chatbotRoutes);

// ===============================
// Debugging
// ===============================
console.log("🔹 JWT_SECRET:", process.env.JWT_SECRET);
console.log("🔹 MONGO_URI:", process.env.MONGO_URI);
console.log("✅ Registered Routes:");
app._router.stack.forEach(r => {
    if (r.route && r.route.path) {
        console.log(`  🔹 ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
    }
});

// ===============================
// Error Handling
// ===============================
app.use((req, res) => {
    res.status(404).json({ error: "❌ Route Not Found" });
});

// ===============================
// Test Route
// ===============================
app.get('/', (req, res) => {
    res.send("👋 Welcome to Projet_2CP API!");
});

// ===============================
// Start Server
// ===============================
server.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));

// Export for testing
module.exports = app;

