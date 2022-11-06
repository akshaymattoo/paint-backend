const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://paint-front.onrender.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("mouse", (data) => {
    console.log(`from ${socket.id} ${JSON.stringify(data)}}`);
    socket.broadcast.emit("mouse", data);
  });
});

app.get("/", (req, res) => {
  res.send("Up and running");
});
server.listen(3001, () => {
  console.log("SERVER IS RUNNING on 3001");
});
