import userModel from "../dao/models/user.model.js";
import {
  isValidPassword,
  verifyEmailToken,
  createHash,
  generateEmailToken,
} from "../utils.js";
import { CustomError } from "../services/error/customError.js";
import { generateLoginErrorInfo } from "../services/error/loginErrorMsg.js";
import { EError } from "../enums/EError.js";
import { sendRecoveryEmail } from "../config/messages/gmail.js";

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
    } catch (error) {
      res.status(500).send(error.message);
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
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const postForgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.find({ email: email });
    if (!user) {
      return res.send(
        `<p>el usuario no existe, <a href="/signup">Crea una cuenta</a></p>`
      );
    }
    const token = generateEmailToken(user.email, 600);
    await sendRecoveryEmail(email, token);
    res.send(
      "<p>Fue enviado el correo con las instrucciones para restablecer la contraseña</p>"
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const postResetPass = async (req, res) => {
  try {
    const token = req.query.token;
    const { email, newPassword } = req.body;
    //validar que el token sea valido.
    const validEmail = verifyEmailToken(token);
    console.log(validEmail);
    if (!validEmail) {
      return res.send(
        `El enlace caduco o no es valido, <a href="/forgot-password">intentar de nuevo</a>`
      );
    }
    //validamos que el usuario exista en la db
    const user = await userModel.find({ email: email });
    if (!user) {
      return res.send(
        `<p>el usuario no existe, <a href="/signup">Crea una cuenta</a></p>`
      );
    }
    if (isValidPassword(user, newPassword)) {
      //si las contrasenas son iguales
      return res.render("resetPassword", {
        error: "no puedes usar la misma contraseña",
        token,
      });
    }
    //procedemos a actualizar la contrasena del usuario en la db
    const newUser = {
      ...user,
      password: createHash(newPassword),
    };
    await userModel.updateOne({ _id: id }, newUser);
    res.redirect("/login");
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
};
