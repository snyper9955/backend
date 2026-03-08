const express = require("express");
const router = express.Router();
const messageController = require("../controller/message.Controller.js");
const auth = require("../middleware/auth.js");

router.post("/send", auth, messageController.sendMessage);

router.get("/chat/:otherUserId", auth, messageController.getChat);

module.exports = router;