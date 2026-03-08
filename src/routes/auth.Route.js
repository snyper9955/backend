const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  allUsers,
  checkAuth
} = require("../controller/auth.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users",allUsers);
router.get("/check", auth, checkAuth);

module.exports = router;