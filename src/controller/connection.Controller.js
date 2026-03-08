const Connection = require("../models/Connection.js");
const User = require("../models/User.model.js");


// SEND CONNECTION REQUEST
exports.sendRequest = async (req, res) => {
  try {

    const senderId = req.user.id;   
    const { email } = req.body;

    const receiver = await User.findOne({ email });

    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (receiver._id.toString() === senderId) {
      return res.status(400).json({ message: "Cannot connect with yourself" });
    }

    const existingConnection = await Connection.findOne({
      sender: senderId,
      receiver: receiver._id
    });

    if (existingConnection) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const connection = await Connection.create({
      sender: senderId,
      receiver: receiver._id
    });

    res.status(200).json({
      message: "Connection request sent",
      connection
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ACCEPT CONNECTION REQUEST
exports.acceptRequest = async (req, res) => {
  try {

    const { connectionId } = req.body;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    connection.status = "accepted";

    await connection.save();

    res.status(200).json({
      message: "Connection accepted",
      connection
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// DENY/REJECT CONNECTION REQUEST
exports.denyRequest = async (req, res) => {
  try {

    const { connectionId } = req.body;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    connection.status = "rejected";

    await connection.save();

    res.status(200).json({
      message: "Connection request denied",
      connection
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// GET PENDING REQUESTS
exports.getPendingRequests = async (req, res) => {
  try {

    const userId = req.user.id;

    const requests = await Connection.find({
      receiver: userId,
      status: "pending"
    }).populate("sender", "name email");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// GET ACCEPTED CONNECTIONS
exports.getConnections = async (req, res) => {
  try {

    const userId = req.user.id;

    const connections = await Connection.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ],
      status: "accepted"
    }).populate("sender receiver", "name email");

    res.status(200).json(connections);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};