import * as dotenv from "dotenv";
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
const SECRET_SESSION = process.env.SECRET_SESSION;
const NODE_ENV = process.env.NODE_ENV;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ADMIN_GMAIL = process.env.ADMIN_GMAIL;
const ADMIN_GMAIL_PASS = process.env.ADMIN_PASS;

export const options = {
  mongoDB: {
    url: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ijkaujy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  },
  server: {
    port: PORT,
    secretSession: SECRET_SESSION,
    tokenKey: TOKEN_SECRET,
  },
  logger: {
    nodeEnv: NODE_ENV,
  },
  gmail: {
    adminGmail: ADMIN_GMAIL,
    adminPass: ADMIN_GMAIL_PASS,
  },
};
