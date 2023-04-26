import express from "express";
import {
  getLogin,
  postLogin,
  postForgotPass,
  postResetPass,
} from "../controllers/login.controller.js";

const loginRouter = express.Router();

loginRouter.get("/", getLogin);

loginRouter.post("/", postLogin);

loginRouter.post("/forgot-password", postForgotPass);

loginRouter.post("/reset-password", postResetPass);

export default loginRouter;
