const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

//Conexión a la base de datos
connection();

const app = express();
const PORT = 3000;

const route_comic = require("./routes/comic");

app.use(cors());
app.use(express.json());
app.use("/comics", route_comic);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto" + PORT);
});
