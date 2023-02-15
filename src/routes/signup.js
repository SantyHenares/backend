import express from "express";
import userModel from "../dao/models/user.model.js";
import { createHash } from "../utils.js";

const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.render("signup", {});
});

signupRouter.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const newUser = {
    first_name,
    last_name,
    email,
    password: createHash(password),
  };

  try {
    const response = await userModel.create(newUser);
    res.send({ status: "success", payload: response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default signupRouter;
