const languagesController = require("../controllers").languages;
const usersController = require("../controllers").users;
const Room = require("../models/room");

module.exports = app => {
  app.get("/languages", languagesController.list);
  app.post("/interpret", languagesController.interpret);
  app.get("/user", usersController.getUser);
  app.post("/users", usersController.create);
  app.post("/login", usersController.login);

  //test routes for rooms
  app.post("/rooms", (req, res) => {
    console.log(req.body);
    let room = new Room({ name: req.body.name });

    room.save((err, room) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ room });
      }
    });
  });

  app.get("/rooms", (req, res) => {
    Room.findOne({ name: "post-test" }, "", (err, room) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ room });
      }
    });
  });
};
