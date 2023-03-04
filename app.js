const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

require("./api/database/mongo");

const routes = {
  index: require("./api/routes/index"),
  users: require("./api/routes/users")
}

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

app.use("/", routes.index);
app.use("/users", routes.users);

app.use(function (request, response, next) {
  next(createError(404));
});

app.use(function (error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  response.status(error.status || 500).json({ error: error.message });
});

module.exports = app;
