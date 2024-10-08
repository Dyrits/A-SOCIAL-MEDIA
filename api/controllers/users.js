const mongoose = require("mongoose");
const passport = require("passport");

const ObjectId = mongoose.Types.ObjectId;

const User = mongoose.model("User");

module.exports = {
  register: async ({ body }, response) => {
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
    user.save()
      .then($user => {
        // Remove password and salt from user object:
        $user.password = null;
        $user.salt = null;
        const token = $user.generateJWT();
        return response.status(200).json({ user: $user, token });
      })
      .catch(error => {
        console.error(error);
        return response.status(500).json({ error });
      });

  },
  login: (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ error: "All fields are required." });
    }
    passport.authenticate("local", {},  (error, user, info) => {
      if (error) {
        return response.status(500).json({ error });
      }
      if (!user) {
        return response.status(400).json({ error: info.message });
      }
      // Remove password and salt from user object:
      user.password = null;
      user.salt = null;
      const token = user.generateJWT();
      return response.status(200).json({ user, token });
    })(request, response);
  },
  temporary: (request, response) => {
    return response.status(200).json({ message: "Temporary route." });
  },
  search: (request, response) => {
    // Get authenticated user id as ObjectId:
    const id = new ObjectId(request.auth.id);
    // Search for users by first name, last name, or full name, and exclude current authenticated user:
    const regex = request.query.query || String();
    User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: regex, $options: "i" } },
            { lastName: { $regex: regex, $options: "i" } },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$firstName", " ", "$lastName"] },
                  regex,
                  options: "i"
                }
              }
            }
          ]
        },
        { _id: { $ne: id } }
      ]
    })
      .then(users => {
        return response.status(200).json({ users });
      })
      .catch(error => {
        console.error(error);
        return response.status(500).json({ error });
      });
  }
};

