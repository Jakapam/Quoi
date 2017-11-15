const Room = require("../models/room");

module.exports = {
  getMessages(req, res) {
    console.log(req.params.room);
    Room.findOne({ name: req.params.room }, "messages", (err, messages) => {
      res.status(201).send(messages);
    });
  }
};
