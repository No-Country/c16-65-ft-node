import { userModel } from "../models/User.js";
import CartController from "../controllers/cart.js"

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({
      status: "Success",
      users,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al obtener los usuarios",
      error: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { nickname, email, picture } = req.body;

    if (!nickname || !email || !picture) {
      return res.status(400).json({
        status: "Error",
        mensaje: "Los campos 'nickname', 'email' y 'picture' son obligatorios.",
      });
    }

    const existsUser = await userModel.findOne({ email });

    if (existsUser) {
      return res.status(400).json({
        status: "Success",
        mensaje: "El correo electrónico ya está registrado",
        existsUser
      });
    }

    const cartUser = await CartController.createCartEmpty()
    const newUser = await userModel.create({ nickname, email, picture, cart: cartUser._id });
    return res.status(200).json({
      status: "Success",
      mensaje: "Usuario creado con éxito",
      newUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al crear el usuario",
      error: error,
    });
  }
}

export default {
  getUsers,
  createUser
};