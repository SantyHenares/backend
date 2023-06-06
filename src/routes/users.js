import express from "express";
import {
  modifyUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUsers,
} from "../controllers/user.controller.js";
import { checkRoles } from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.put("/premium/:uid", checkRoles("admin"), modifyUser);

usersRouter.post("/:uid/documents");

usersRouter.get("/", getAllUsers);

usersRouter.get("/:uid", getUser);

usersRouter.put("/:uid", updateUser);

usersRouter.delete("/:uid", deleteUsers);

export default usersRouter;
