const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('🔑 Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🧩 Decoded Token:', decoded);

    const userId = decoded.userId;  // 🔥 FIXED
    console.log('🔍 User ID from Token:', userId);

    const user = await User.findById(userId);
    console.log('👤 User from DB:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Authentication Error:', error.message);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authenticateUser;