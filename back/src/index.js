import connection from "./database/connection.js";
<<<<<<< HEAD
import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { __dirname } from "./utils.js";
import envconfig from "./config/config.js";

//Auth0 require
import { auth } from "express-openid-connect";

=======
import express from "express"
import cors from "cors"
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { __dirname } from "./utils.js";
>>>>>>> ce79a1a73d32ce6287f8a206d6fba434d55870f4
//Conexión a la base de datos
connection();

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
<<<<<<< HEAD
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

//Auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: envconfig.secret,
  baseURL: envconfig.baseURL,
  clientID: envconfig.clientID,
  issuerBaseURL: envconfig.issuerBaseURL,
};

import route_comic from "./routes/comic.js";

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
//Auth0
app.use(auth(config));

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
=======
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
>>>>>>> ce79a1a73d32ce6287f8a206d6fba434d55870f4

// RUTAS
app.use("/api/comics", route_comic);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto" + PORT);
});
