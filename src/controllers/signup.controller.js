import passport from "passport";

export const getSignup = (req, res) => {
  res.render("signup", {});
};

export const postSignup = async (req, res) => {
  passport.authenticate("register", (err, user) => {
    try {
      if (err) {
        throw new Error("Error al registrar el usuario: " + err);
      }
      res.redirect("/login");
    } catch (error) {
      res.status(500).send(error.message);
    }
  })(req, res);
};
