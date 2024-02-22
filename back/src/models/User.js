import mongoose from "mongoose";

const UserCollection = "users";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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