import dotenv from "dotenv";

dotenv.config();

export default {
  mongoUser: process.env.MONGO_USER,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};
