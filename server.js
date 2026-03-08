require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/db/db')
const http = require("http");
const { Server } = require("socket.io");
const { initSocket } = require("./src/socket/Socket.js");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

initSocket(io);

server.listen(3000, () => {
  console.log('server is runing on port 3000');
});
