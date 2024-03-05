import dotenv from "dotenv"

dotenv.config();

export default {
  mongoUser: process.env.MONGO_USER,
  gmailNodemailer: process.env.GMAIL_NODEMAILER,
}
