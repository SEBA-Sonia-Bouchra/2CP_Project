const { Server } = require("socket.io");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Set this to the frontend URL in production
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // When a user registers, join them to a room based on their userId
    socket.on("register", (userId) => {
      if (userId) {
        socket.join(userId); // Join user to their unique room
        console.log(`User ${userId} joined room`);
      } else {
        console.log("Error: No userId provided");
      }
    });

    // Optionally handle user disconnection
    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
      // Clean up rooms when user disconnects if necessary
      // socket.leave(userId);  // Leave the room if needed
    });
  });

  return io;
}

module.exports = setupSocket;
