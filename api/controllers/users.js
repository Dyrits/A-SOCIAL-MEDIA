const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
  register: ({ body }, response) => {
    const { firstName, lastName, email, password, confirmation } = body;
    if (!firstName || !lastName || !email || !password || !confirmation) {
      return response.status(400).json({ error: "All fields are required." });
    }
    if (password !== confirmation) {
      return response.status(400).json({ error: "Passwords do not match." });
    }
    const user = new User({
      firstName,
      lastName,
      email
    });
    user.setPassword(password);
    user.save((error, $user) => {
      if (error) {
        return response.status(500).json({ error });
      }
      return response.status(200).json({ user: $user });
    });
  },
  login: (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ error: "All fields are required." });
    }
    passport.authenticate("local", (error, user, info) => {
      if (error) {
        return response.status(500).json({ error });
      }
      if (!user) {
        return response.status(400).json({ error: info.message });
      }
      return response.status(200).json({ user });
    })(request, response);
  }
};
