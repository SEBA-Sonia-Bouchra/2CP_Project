const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        console.log("🔹 Middleware triggered for:", req.method, req.url); // ✅ Log incoming request

        const authHeader = req.header("Authorization");
        
        if (!authHeader) {
            console.error("❌ No Authorization header provided.");
            return res.status(401).json({ message: "No token provided." });
        }

        const token = authHeader.split(" ")[1]; // Extract the token part

        if (!token) {
            console.error("❌ Token format incorrect. Received header:", authHeader);
            return res.status(401).json({ message: "Token format is incorrect." });
        }

        console.log("🔹 Received Token:", token); // ✅ LOG THE TOKEN

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("❌ JWT Verification Error:", err.message);
                return res.status(403).json({ message: "Invalid token." });
            }
        
            console.log("✅ Decoded Token:", decoded); // ✅ LOG DECODED TOKEN
        
            // Ensure decoded token has `userId`
            if (!decoded.userId) {
                console.error("❌ Token does not contain a userId:", decoded);
                return res.status(400).json({ message: "Invalid token payload." });
            }
        
            // ✅ Ensure req.user contains only `userId` and `role`
            req.user = { userId: decoded.userId, role: decoded.role };
        
            console.log("🆔 Attached User to Request:", req.user);
            next();
        });        

    } catch (error) {
        console.error("❌ Unexpected Server Error:", error);
        res.status(500).json({ message: "Server error during authentication." });
    }
};

console.log("🔹 JWT_SECRET Loaded:", process.env.JWT_SECRET);

module.exports = authMiddleware;

