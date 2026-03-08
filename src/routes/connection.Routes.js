const express = require("express");
const router = express.Router();

const connectionController = require("../controller/connection.Controller");
const auth = require("../middleware/auth");


router.post("/request", auth, connectionController.sendRequest);

router.post("/accept", auth, connectionController.acceptRequest);

router.post("/deny", auth, connectionController.denyRequest);

router.get("/pending", auth, connectionController.getPendingRequests);

router.get("/list", auth, connectionController.getConnections);


module.exports = router;