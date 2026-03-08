const Message = require("../models/Message.js");
const Connection = require("../models/Connection.js");
const Notification = require("../models/Notification.js");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({ message: "Receiver and message required" });
    }

    // Check if users are connected
    const connection = await Connection.findOne({
      $or: [
        { sender: senderId, receiver: receiverId, status: "accepted" },
        { sender: receiverId, receiver: senderId, status: "accepted" }
      ]
    });

    if (!connection) {
      return res.status(403).json({ message: "You are not connected with this user" });
    }

    // Create message
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message
    });

    // Create a notification for the receiver
    await Notification.create({
        sender: senderId,
        receiver: receiverId,
        message: message.substring(0, 50) + (message.length > 50 ? "..." : "") // Short snippet limit
    });

    res.status(200).json(newMessage);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CHAT HISTORY BETWEEN TWO USERS
exports.getChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;

    // Check if users are connected
    const connection = await Connection.findOne({
      $or: [
        { sender: userId, receiver: otherUserId, status: "accepted" },
        { sender: otherUserId, receiver: userId, status: "accepted" }
      ]
    });

    if (!connection) {
      return res.status(403).json({ message: "You are not connected with this user" });
    }

    // Get chat messages
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ createdAt: 1 }); // oldest first

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};