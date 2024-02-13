const { Schema, model } = require("mongoose");

const ComicSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "default.png",
  },
  pdf: {
    type: String,
    required: true,
  },
});

module.exports = model("Comic", ComicSchema, "comics");
