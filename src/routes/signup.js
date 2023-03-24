import express from "express";
import { getSignup, postSignup } from "../controllers/signup.controller.js";

const signupRouter = express.Router();

signupRouter.get("/", getSignup);

signupRouter.post("/", postSignup);

export default signupRouter;
