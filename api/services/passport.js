const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

const strategy = new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  User.findOne({ email }).then( user => {
    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }
    if (!user.validatePassword(password)) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  }).catch(error => {
    return done(error);
  });
});

passport.use(strategy);
