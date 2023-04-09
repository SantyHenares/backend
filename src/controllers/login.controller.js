import userModel from "../dao/models/user.model.js";
import { isValidPassword } from "../utils.js";
import { CustomError } from "../services/error/customError.js";
import { generateLoginErrorInfo } from "../services/error/loginErrorMsg.js";
import { EError } from "../enums/EError.js";

export const getLogin = async (req, res) => {
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
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      // res.status(400).send({ status: "error", error: "Faltan datos" });
      // return;
      CustomError.createError({
        name: "Login error",
        cause: generateLoginErrorInfo(req.body),
        message: "Error al loggear",
        errorCode: EError.INVALID_TYPES,
      });
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
};
