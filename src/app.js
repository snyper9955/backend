const express = require('express');
const router = require('./routes/auth.Route');
const cookieParser = require("cookie-parser");
const connectionRoutes = require("./routes/connection.Routes");
const messageRoutes = require("./routes/message.Routes");
const postRoutes = require("./routes/post.Route");
const notificationRoutes = require("./routes/notification.Routes");
const cors = require("cors");
const app =express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',router)
app.use("/api/connection", connectionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/posts", postRoutes);
app.get('/api',(req,res)=>{res.send('hello from backend side')})
module.exports = app 