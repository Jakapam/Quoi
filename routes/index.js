const languagesController = require("../controllers").languages;
const usersController = require("../controllers").users;
const roomsController = require("../controllers").rooms;

module.exports = app => {
  app.get("/:room/messages", roomsController.getMessages);
  app.get("/languages", languagesController.list);
  app.post("/interpret", languagesController.interpret);
  app.get("/user", usersController.getUser);
  app.post("/users", usersController.create);
  app.post("/login", usersController.login);
};
