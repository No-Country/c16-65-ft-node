import connection from "./database/connection.js";
import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { __dirname } from "./utils.js";
import Stripe from "stripe";

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
import route_payment from "./routes/payment.js";

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//Inicialización de Stripe
// const stripe = new Stripe(
//   "sk_test_51OpHNsEK8KljwIog2Ro96dbDBuvPcr2X2DKFwQpDnrK6GSBlnyEiAyE3BFOv8J6Ob1sX2MehVKqn5P00boV3odu300O2oBWoC2",
// );

// RUTAS
app.use("/api/comics", route_comic);
app.use("/api/payment", route_payment);

// Configuración RUTA Pago Stripe
// app.post("/api/payment/checkout", async (req, res) => {
//   try {
//     const { id, amount } = req.body;

//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "USD",
//       description: "Testing",
//       payment_method: id,
//     });
//     console.log(payment);
//     res.send({ message: "Succesfull payment" });
//   } catch (error) {
//     console.log(error);
//     res.json({ message: error.raw.message });
//   }
// });

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto" + PORT);
});
