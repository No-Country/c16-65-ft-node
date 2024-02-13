const mongoose = require("mongoose");
const mongoUser = require("../config/config");

const connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${mongoUser.mongoUser}@cluster0.o0n7p3d.mongodb.net/ecommerce`,
    );
    console.log("Conectado correctamente a la base de datos");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos");
  }
};

module.exports = {
  connection,
};
