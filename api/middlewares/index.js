const { expressjwt: jwt } = require("express-jwt");

const authorize = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: true
});

module.exports = {
  authorize
};