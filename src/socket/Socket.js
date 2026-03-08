const Message = require('../models/Message.js');

const onlineUsers = new Map();

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New User Connected", socket.id);

    socket.on("join", (userId) => {
      console.log(`User ${userId} joined with socket ${socket.id}`);
      onlineUsers.set(userId, socket.id);
      socket.join(userId); // Join a unique room for this user
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { senderId, receiverId, message } = data;
  } catch (error) {
         console.error("Socket error", error);
      }
    });

  
    socket.on("deliverMessage", (messageObj) => {
       // Emit to the user's room to broadcast to all their active socket connections
       io.to(messageObj.receiver).emit("receiveMessage", messageObj);
       
       // Emit a notification event
       io.to(messageObj.receiver).emit("newNotification", {
           sender: messageObj.sender,
           receiver: messageObj.receiver,
           message: messageObj.message.substring(0, 50) + (messageObj.message.length > 50 ? "..." : "")
       });
    });

    socket.on("disconnect", () => {
       console.log("User disconnected", socket.id);
       // Remove from online mapping
       for (const [userId, socketId] of onlineUsers.entries()) {
          if (socketId === socket.id) {
             onlineUsers.delete(userId);
             break;
          }
       }
    });

  });
};

module.exports = { initSocket };