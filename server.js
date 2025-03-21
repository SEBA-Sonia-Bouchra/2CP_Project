require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const annotationRoutes = require('./routes/annotationRoutes');

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
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Handle Undefined Routes (404)
app.use((req, res) => {
    res.status(404).json({ error: "❌ Route Not Found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

