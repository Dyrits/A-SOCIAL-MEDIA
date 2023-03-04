const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

const strategy = new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  User.findOne({ email }, (error, user) => {
    if (error) {
      return done(error);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }
    if (!user.validatePassword(password)) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  });
});

passport.use(strategy);
