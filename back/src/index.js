import connection from "./database/connection.js";
import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { __dirname } from "./utils.js";
//Conexión a la base de datos
connection();

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de Comics",
      description: "API de comics",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

import route_comic from "./routes/comic.js";
import route_users from "./routes/users.js";
import route_carts from "./routes/carts.js";
import route_payment from "./routes/payment.js";
import route_purchases from "./routes/purchases.js";

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// RUTAS
app.use("/api/comics", route_comic);
app.use("/api/users", route_users);
app.use("/api/carts", route_carts);
app.use("/api/payment", route_payment);
app.use("/api/purchases", route_purchases);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto" + PORT);
});