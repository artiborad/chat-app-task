const express = require("express");
const path = require("path");
const http = require("http");

const { MongoClient } = require("mongodb");
const app = express();
const Users = require("./model/user.model");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const userController = require("../src/controller/user.controller");
const { router } = require("./router/user.router");
// const { use } = require("./router/user.router");
// const { Server } = require("https");
const {
  createNewUser,
  deleteUser,
  getUserDetails,
  updateUserDetails,
  updateOnlineVisibility,
  responseGenrate
} = require("../src/controller/socket.controller");

// const { responseGenrate } = require("../src/controller/socket.controller");
// const { nextTick } = require("process");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "../src/controller"));
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(
  "mongodb+srv://arti:arti1234@cluster0.yj4az.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("Database connected");
  }
);
app.use("/user", router);

io.on("connection", async (socket) => {
  const user = await userController.getUserById(socket.handshake.query._id);
  try {
    console.log(user);
    if (user) {
      let userStatusUpdate = await updateOnlineVisibility(user._id,true);
      console.log(userStatusUpdate);
      console.log("user connected");
    }
  } catch (e) {
    console.log(e);
  }

  socket.on("sendNotification", async (message) => {
    try {
      let connectedUsers = await io.fetchSockets();

      console.log("1111", connectedUsers);

      for (const i of connectedUsers) {
        const MsgId = message._id.includes(i.handshake.query._id);
        if (MsgId) {
          console.log("get", i.id);
          i.emit("notification", "hello");
        }
      }
    } catch (e) {
      console.log(e);
    }
  });

  const eventList = [
    "createNewUser",
    "updateUser",
    "getAllDetails",
    "deleteUser",
  ];
  // console.log(userData)
  socket.use((event, next) => {
    console.log(event);
    if (eventList.includes(event[0])) {
      if (user.role == "admin") {
        console.log("next");
        next();
      } else {
        if (event[2]) {
          
          event[2](responseGenrate(true,"Unauthorized!"));
        }
      }
    } else {
      next();
    }
  });

  socket.on("createNewUser", createNewUser);
  socket.on("updateUser", updateUserDetails);
  socket.on("getAllDetails", getUserDetails);
  socket.on("deleteUser", deleteUser);

  socket.on("disconnect", async (req) => {
    console.log(req);
    console.log(user);
    console.log(user._id);
    let update = await updateOnlineVisibility(user._id,false);
    console.log(update);
  });
});

server.listen(3000, function () {
  console.log("Listening on 3000");
});
