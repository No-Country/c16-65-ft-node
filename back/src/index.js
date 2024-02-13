import connection from "./database/connection.js";
import express from "express"
import cors from "cors"
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { __dirname } from "./utils.js";
//Conexión a la base de datos
connection();

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: "Documentación de Comics",
      description: "API de comics"
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

import route_comic from "./routes/comic.js"

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use("/comics", route_comic);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto" + PORT);
});
