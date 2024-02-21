import { userModel } from "../models/User.js";

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

export default {
  getUsers
};
