const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  likePost
} = require("../controller/postController");

const auth = require("../middleware/auth");

router.post("/create", auth, createPost);
router.get("/feed", auth, getPosts);
router.put("/like/:id", auth, likePost);

module.exports = router;