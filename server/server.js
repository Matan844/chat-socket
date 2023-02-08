const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const authController = require("./authController");
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose
  .connect(
    "mongodb+srv://matan123:123098@cluster0.wztsq2s.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("connected"))
  .catch((error) => {
    console.log("connection to data base fail");
    console.log(error);
  });

const io = require("socket.io")(2000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(`socket connected id: ${socket.id}`);
  socket.on("send-message", async (message, room, sender) => {
    if (room === "") socket.broadcast.emit("recieve-message", message, room);
    else {
       authController.addChatSocket(sender, message, room);
      console.log(message);
      const alldata = await authController.getalldata();
      alldata.push(message);
      io.sockets.emit("all-chats", alldata);
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

app.use(bodyParser.json());
app.use(cors());
app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/list", authController.list);
app.post("/addchat", authController.addChat);
app.post("/delete", authController.delete);
app.listen(8000, () => console.log("listening on port 8000"));
