const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

//Conexión a la base de datos
connection();

const app = express();
const PORT = 3000;

app.use(cors());

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto" + PORT);
});
