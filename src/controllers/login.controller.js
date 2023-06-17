import {
  isValidPassword,
  verifyEmailToken,
  createHash,
  generateEmailToken,
} from "../utils.js";
import { sendRecoveryEmail } from "../config/messages/gmail.js";
import { userService } from "../dao/repository/index.repository.js";

export const getLogin = async (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    res.render("login", {});
  } else {
    try {
      const response = await userService.getUserByEmail(email);
      req.session.user = email;
      req.session.admin = true;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export const postForgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.send(
        `<p>el usuario no existe, <a href="/signup">Crea una cuenta</a></p>`
      );
    }
    const token = generateEmailToken(user.email, 600);
    await sendRecoveryEmail(email, token);
    res.send(token);
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
    console.log(token);
    console.log(validEmail);
    if (!validEmail) {
      return res.send(
        `El enlace caduco o no es valido, <a href="/forgot-password">intentar de nuevo</a>`
      );
    }
    //validamos que el usuario exista en la db
    const user = await userService.getUserByEmail(email);
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
    await userService.updateUser(id, newUser);
    res.redirect("/login");
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
};
