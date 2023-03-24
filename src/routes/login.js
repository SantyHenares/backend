import express from "express";
import { getLogin, postLogin } from "../controllers/login.controller.js";

const loginRouter = express.Router();

loginRouter.get("/", getLogin);

loginRouter.post("/", postLogin);

export default loginRouter;
