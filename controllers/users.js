const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config.js");
const bcrypt = require("bcrypt");

module.exports = {
  create(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10);

    debugger;

    return User.create(
      {
        username: req.body.username,
        password_digest: hash
      },
      (err, user) => {
        console.log(user);
        const token = jwt.sign(
          {
            id: user.id
          },
          config.JWT_SECRET,
          { expiresIn: "24h" }
        );
        const userInfo = { username: user.username, id: user.id, jwt: token };
        res.status(201).send(userInfo);
      }
    );
  },

  login(req, res) {
    return User.findOne({ username: req.body.username }, "", (err, user) => {
      if (bcrypt.compareSync(req.body.password, user.password_digest)) {
        const token = jwt.sign(
          {
            id: user.id
          },
          config.JWT_SECRET,
          { expiresIn: "24h" }
        );
        const userInfo = { username: user.username, id: user.id, jwt: token };
        res.status(201).send(userInfo);
      } else {
        const error = {
          error: "Invalid Username or Password"
        };
        res.status(401).send(error);
      }
    });
  },

  getUser(req, res) {
    const decodedToken = jwt.verify(
      req.headers["authorization"],
      config.JWT_SECRET
    );

    return User.findById(decodedToken.id, (err, user) => {
      const userInfo = { username: user.username, id: user.id };
      res.status(201).send(userInfo);
    });
  }
};
