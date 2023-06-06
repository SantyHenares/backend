import express from "express";
import {
  getLogin,
  postForgotPass,
  postResetPass,
} from "../controllers/login.controller.js";
import passport from "passport";

const loginRouter = express.Router();

loginRouter.get("/", getLogin);

loginRouter.post(
  "/",
  passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/failure-login",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

loginRouter.get("/failure-login", (req, res) => {
  res.send(
    `<div>Error al loguear al usuario, <a href="/login">Intente de nuevo</a></div>`
  );
});

loginRouter.post("/forgot-password", postForgotPass);

loginRouter.post("/reset-password", postResetPass);

export default loginRouter;
