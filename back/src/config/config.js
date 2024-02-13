const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mongoUser: process.env.MONGO_USER,
};
