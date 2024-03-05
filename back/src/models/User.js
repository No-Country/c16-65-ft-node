import mongoose from "mongoose";
import validator from "validator";

const UserCollection = "users";

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    maxlength: 30,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Correo electrónico no válido",
    },
  },
  picture: {
    type: String,
    validate: {
      validator: function (value) {
        if (!validator.isURL(value)) {
          throw new Error("No es una URL válida para la imagen.");
        }

        return true;
      },
      message: "URL de imagen no válida",
    },
  },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: 'carts'
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: 'user'
  },
});

export const userModel = mongoose.model(UserCollection, UserSchema);