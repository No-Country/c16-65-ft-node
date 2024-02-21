import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import validator from "validator";

const ComicCollection = "comics";

const ComicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
  },
  author: {
    type: String,
    required: true,
    maxlength: 30,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("Error al crear el comic, solo se aceptan letras en el autor");
      }
    },
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  publisher: {
    type: String,
    required: true,
    maxlength: 20,
  },
  category: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 5,
    validate(value) {
      if (!validator.isInt(value.toString(), { min: 0 })) {
        throw new Error("Precio no aceptado ");
      }
    },
  },
  thumbnail: {
    type: String,
    default: "default.png",
    maxlength: 40,
    validate: {
      validator: function (value) {
        // Validar si es una URL
        if (!validator.isURL(value)) {
          throw new Error("No es una URL válida.");
        }

        // Validar si termina con .jpg o .png
        if (!/\.(jpg|png)$/.test(value)) {
          throw new Error("La URL debe terminar con .jpg o .png");
        }

        return true;
      },
      message: "URL de imagen no válida",
    },
  },
  pdf: {
    type: String,
    required: true,
    maxlength: 40,
    validate: {
      validator: function (value) {
        // Validar si es una URL
        if (!validator.isURL(value)) {
          throw new Error("No es una URL válida.");
        }

        // Validar si termina con .jpg o .png
        if (!/\.(pdf)$/.test(value)) {
          throw new Error("La URL debe terminar con .jpg o .png");
        }

        return true;
      },
      message: "URL de imagen no válida",
    },
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

ComicSchema.plugin(mongoosePaginate);

export const comicModel = mongoose.model(ComicCollection, ComicSchema);
