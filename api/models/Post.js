import mongoose from "mongoose";

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
date: {
    type: Date,
    default: Date.now
  },
  theme: {
    type: String,
    default: "primary"
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: []
  },
});

module.exports = mongoose.model("Post", schema);