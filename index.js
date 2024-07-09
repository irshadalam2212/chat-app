const { log } = require("console");
const express = require("express");
const http = require("http");

// const {join} = require('node:path')
const socketIo = require("socket.io");
const app = express();

const server = http.createServer(app);
// creating an http express server to handel http request and response under express framework
const io = socketIo(server);
// creating a new instance to attach io to http server

app.get("/", (req, res) => {
  // res.send("<h1>Welcome to Socket Io</h1>")
  res.sendFile(__dirname + "/ChatApp.html");
  // res.sendFile(join(__dirname,'index.html'))
});

var user = 0;

io.on("connection", (socket) => {
  console.log("A user Connected");

  socket.on("disconnect", () => {
    console.log("A user Disconnected");
  });
});
server.listen(3000, () => {
  console.log("Server is running on Port 4321");
});
