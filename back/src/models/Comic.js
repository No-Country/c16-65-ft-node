import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const ComicCollection = "comics"

const ComicSchema = new mongoose.Schema({
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
  publisher: {
    type: String,
    required: true,
  },
  category: {
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

ComicSchema.plugin(mongoosePaginate)

export const comicModel = mongoose.model(ComicCollection, ComicSchema)