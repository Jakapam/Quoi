const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config.js");
const bcrypt = require("bcrypt");

const parseUserInfo = (user, token = null) => {
  return {
    username: user.username,
    language: user.language,
    language_code: user.language_code,
    id: user.id,
    jwt: token
  };
};

module.exports = {
  create(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10);

    debugger;

    return User.create(
      {
        username: req.body.username,
        password_digest: hash,
        language: req.body.language,
        language_code: req.body.language_code
      },
      (err, user) => {
        console.log(user);
        if (err) {
          console.log(err);
          res
            .status(400)
            .send({ error: "Sorry, there was an issue with your request" });
        } else {
          const token = jwt.sign(
            {
              id: user.id
            },
            config.JWT_SECRET,
            { expiresIn: "24h" }
          );
          const userInfo = parseUserInfo(user, token);
          res.status(201).send(userInfo);
        }
      }
    );
  },

  login(req, res) {
    return User.findOne({ username: req.body.username }, (err, user) => {
      if (bcrypt.compareSync(req.body.password, user.password_digest)) {
        const token = jwt.sign(
          {
            id: user.id
          },
          config.JWT_SECRET,
          { expiresIn: "24h" }
        );
        const userInfo = parseUserInfo(user, token);
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
      const userInfo = parseUserInfo(user);
      res.status(201).send(userInfo);
    });
  }
};
