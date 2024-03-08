import mongoose from "mongoose";

const schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Comment", schema);