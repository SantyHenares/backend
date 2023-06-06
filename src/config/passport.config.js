import passport from "passport";
import local from "passport-local";
import { userService } from "../dao/repository/index.repository.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const inicializatePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
          const user = await userService.getUserByEmail(username);
          if (user) {
            return done(null, false);
          }
          let rol = "usuario";
          if (email.endsWith("@coder.com")) {
            rol = "admin";
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            rol,
          };
          const result = await userService.addUser(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener usuario " + error);
        }
      }
    )
  );

  passport.use(
    "loginStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userService.getUserByEmail(username);
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(password, user.password))
            return done(null, false);
          user.last_connection = new Date();
          // user.save();
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //serialización y deserialización
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.getUserById(id);
    done(null, user);
  });
};

export default inicializatePassport;
