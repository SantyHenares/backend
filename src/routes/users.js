import express from "express";
import { modifyUser } from "../controllers/user.controller.js";
import { checkRoles } from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.put("/premium/:uid", checkRoles("admin"), modifyUser);

usersRouter.post("/:uid/documents");

export default usersRouter;
