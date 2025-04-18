const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      console.error("❌ No Authorization header provided.");
      return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.error("❌ Malformed Authorization header:", authHeader);
      return res.status(401).json({ message: "Invalid token format." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ JWT verification failed:", err.message);
        return res.status(403).json({ message: "Invalid token." });
      }

      if (!decoded.id) {
        console.error("❌ Token missing 'id':", decoded);
        return res.status(400).json({ message: "Invalid token payload." });
      }

      req.user = { userId: decoded.id };
      next();
    });
  } catch (error) {
    console.error("❌ Middleware exception:", error);
    res.status(500).json({ message: "Authentication error." });
  }
};

module.exports = authMiddleware;
