import express from "express";
import { getCurrent, postLogOut } from "../controllers/session.controller.js";

const sessionRouter = express.Router();

sessionRouter.get("/current", getCurrent);

sessionRouter.post("/logout", postLogOut);

export default sessionRouter;
