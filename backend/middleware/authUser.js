const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    // Check if the Authorization header contains the token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('🔑 Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🧩 Decoded Token:', decoded);

    // Use the id from the decoded token to find the user in the database
    const userId = decoded.id;  // Should match the field used in your JWT payload
    console.log('🔍 User ID from Token:', userId);

    // Fetch user from DB
    const user = await User.findById(userId);
    console.log('👤 User from DB:', user);

    // If the user is not found in the database, return a 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to req.user to use in subsequent routes
    req.user = {
      _id: user._id.toString(),  // Store the user ID as a string
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isProfessional: user.isProfessional
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('❌ Authentication Error:', error.message);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authenticateUser;

