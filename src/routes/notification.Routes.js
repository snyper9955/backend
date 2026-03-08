const express = require("express");
const { getNotifications, markAsRead, markAllAsRead } = require("../controller/notification.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getNotifications);
router.put("/:notificationId/read", auth, markAsRead);
router.put("/read-all", auth, markAllAsRead);

module.exports = router;
