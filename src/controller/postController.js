const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {

    const post = await Post.create({
      author: req.user.id,
      content: req.body.content,
      image: req.body.image
    });

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json({ message: "Post creation failed" });
  }
};





exports.getPosts = async (req, res) => {

  const posts = await Post.find()
    .populate("author", "name profileImage")
    .sort({ createdAt: -1 });

  res.json(posts);

};




exports.likePost = async (req, res) => {

  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
  }

  await post.save();

  res.json(post);
};