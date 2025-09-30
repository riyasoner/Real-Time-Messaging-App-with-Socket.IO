const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = {};

app.use(express.static("public"));

const broadcastUserList = () => {
  io.emit("userList", Object.values(users));
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username, callback) => {
    if (!username || username.trim() === "")
      return callback("Username cannot be empty");
    if (Object.values(users).includes(username))
      return callback("Username already taken");

    users[socket.id] = username;
    broadcastUserList();
    io.emit("message", {
      user: "System",
      text: `${username} joined`,
      time: new Date().toLocaleTimeString(),
    });
    callback(null);
  });

  socket.on("chatMessage", (msg) => {
    const username = users[socket.id];
    if (!username) return;
    if (!msg || !msg.trim()) return;

    io.emit("message", {
      user: username,
      text: msg,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      broadcastUserList();
      io.emit("message", {
        user: "System",
        text: `${username} left`,
        time: new Date().toLocaleTimeString(),
      });
    }
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
