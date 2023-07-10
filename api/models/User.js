require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const salt = () => crypto.randomBytes(16).toString("hex");
const encrypt = (password, salt) => crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: String,
  salt: String
});

schema.methods.setPassword = function (password) {
  this.salt = salt();
  this.password = encrypt(password, this.salt);
};

schema.methods.validatePassword = function (password) {
  return this.password === encrypt(password, this.salt);
};

schema.methods.generateJWT = function () {
  return jwt.sign({
    email: this.email,
    id: this._id
  }, process.env.JWT_SECRET);
};

mongoose.model("User", schema);
