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
});

module.exports = model("Comic", ComicSchema, "comics");
