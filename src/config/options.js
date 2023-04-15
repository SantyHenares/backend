import * as dotenv from "dotenv";
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
const SECRET_SESSION = process.env.SECRET_SESSION;
const NODE_ENV = process.env.NODE_ENV;

export const options = {
  mongoDB: {
    url: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ijkaujy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  },
  server: {
    port: PORT,
    secretSession: SECRET_SESSION,
  },
  logger: {
    nodeEnv: NODE_ENV,
  },
};
