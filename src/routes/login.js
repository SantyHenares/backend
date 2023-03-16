import express from "express";
import userModel from "../dao/models/user.model.js";

const loginRouter = express.Router();

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
      req.session.user = email;
      req.session.admin = true;
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).send({ status: "error", error: "Faltan datos" });
      return;
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(404).send({ status: "error", error: "Usuario no encontrado" });
      return;
    }

    if (!isValidPassword(user, password)) {
      res.status(401).send({ status: "error", error: "Contraseña incorrecta" });
      return;
    }
    delete user.password;
    req.session.user = user;
    res.send({ status: "success", payload: user });
    return;
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default loginRouter;
