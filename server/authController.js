const User1 = require("./User");
const chat = require("./Chat");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { phoneNumber, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User1({ phoneNumber, password: hash });
  newUser.save((error, user) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json({ message: "user created" });
    }
  });
};

exports.addChat = (req, res) => {
  const { sender, message, room } = req.body;
  const newChat = new chat({ sender, message, room });
  newChat.save((error, chat) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json({ message: "chat add" });
    }
  });
};
exports.addChatSocket = (sender, message, room) => {
  const newChat = new chat({ sender, message, room });
  newChat.save((error, chat) => {
  });
};
exports.delete = (req, res) => {
  chat.deleteMany({ "": "" }, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting chat" });
    } else {
      res.status(200).json({ message: "clear all deleted" });
    }
  });
};

exports.list = (req, res) => {
  chat.find().then((data) => {
    res.status(200).json({ data });
  });
};
exports.getalldata = () => {
  return chat.find().then((data) => {
    return data;
  });
};

exports.login = (req, res) => {
  User1.findOne(
    {
      phoneNumber: req.body.phoneNumber,
    },
    (error, user1) => {
      if (error) {
        res.status(500).send(error);
      } else {
        bcrypt.compare(req.body.password, user1.password, (error, ismatch) => {
          if (error || !ismatch) {
            res.status(406).json({ message: "error" });
          } else {
            const token = jwt.sign({ id: User1._id }, process.env.JWT_TOKEN);
            res.json({ token });
          }
        });
      }
    }
  );
};
