import express from "express";
import userModel from "../dao/models/user.model.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login", {});
});

loginRouter.get("/", async (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    res.render("login", {});
  } else {
    try {
      const response = await userModel.find({
        email: email,
        password: password,
      });
      console.log(response);
      if (response.length > 0) {
        res.send("home", {});
      } else {
        res.render("login", {});
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

export default loginRouter;
