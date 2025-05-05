const { Server } = require("socket.io");
const { Types } = require("mongoose");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000", // Production-ready
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // Test notification (dev-only)
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        socket.emit("newNotification", { message: "🔔 Test notification" });
      }, 3000);
    }

    // User registration
    socket.on("register", (userId) => {
      if (!userId) {
        console.log("Error: No userId provided");
        return;
      }
      if (!Types.ObjectId.isValid(userId)) {
        console.log("Invalid userId format");
        return;
      }
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = setupSocket;