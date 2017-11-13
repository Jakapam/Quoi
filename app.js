const express = require("express");
const app = require("express")();
const logger = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config.js");
const cors = require("cors");

// app.use(logger('dev'));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("build"));

// app.get("/ipaddress", (req, res, next) => {
//   res.send({
//     address: req.connection.localAddress.match(
//       /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
//     )[0],
//     port: req.connection.localPort
//   });
// });

require("./routes")(app);

app.use("/*", express.static("build"));

// catch 404 and forward to error handle
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
