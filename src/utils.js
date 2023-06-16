import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { options } from "./config/options.js";

//password hash

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

//dirname

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

//token

export const generateEmailToken = (email, expireTime) => {
  const token = jwt.sign({ email }, options.server.tokenKey, {
    expiresIn: expireTime,
  });
  return token;
};

export const verifyEmailToken = (token) => {
  try {
    const info = jwt.verify(token, options.server.tokenKey);
    return info.mail;
  } catch (error) {
    return null;
  }
};
