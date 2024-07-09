const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/ChatApp.html");
});

const users = {}; // Changed to store users

io.on("connection", (socket) => {
  console.log("A user Connected");

  socket.on("login", (username) => {
    users[socket.id] = username; // Storing the username with socket.id as key
    console.log(`${username} logged In`);
  });

  socket.on("chat message", (msg) => {
    const sender = users[socket.id];
    console.log(`${sender}: ${msg}`);
    io.emit("chat message", `${sender}: ${msg}`);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id]; // Accessing the username
    if (username) {
      console.log(`${username} Disconnected`);
      delete users[socket.id]; // Removing the user on disconnect
    }
  });
});

server.listen(4321, () => {
  console.log("Server is running on Port 4321");
});
