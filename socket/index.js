// Setup basic express server
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8000;
// const cors = require("cors");

// server.listen(port, () => {
//   console.log("Server listening at port %d", port);
// });

// Routing
// app.use(express.static(path.join(__dirname, "public")));

// Chatroom

let numUsers = 0;

io.on("connection", (socket) => {
  let addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.on("new coords", (data) => {
    // we tell the client to execute 'new message'
    console.log(data);
    socket.broadcast.emit("newLocation", {
      username: socket.username,
      x: data.x,
      y: data.y,
      username: data.username,
      img: data.img,
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", (username) => {
    if (addedUser) return;

    console.log(username + " added");
    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers,
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers,
    });
  });

  // when the client emits 'typing', we broadcast it to others
  // socket.on("typing", () => {
  //   socket.broadcast.emit("typing", {
  //     username: socket.username,
  //   });
  // });

  // when the client emits 'stop typing', we broadcast it to others
  // socket.on("stop typing", () => {
  //   socket.broadcast.emit("stop typing", {
  //     username: socket.username,
  //   });
  // });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers,
      });
    }
  });
});
