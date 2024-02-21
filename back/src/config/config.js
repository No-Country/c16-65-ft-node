import dotenv from "dotenv";

dotenv.config();

export default {
  mongoUser: process.env.MONGO_USER,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};
