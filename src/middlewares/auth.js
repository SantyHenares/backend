export const isAdminRole = (req, res, next) => {
  if (req.user.rol === "admin") {
    next();
  } else {
    res.send("no tienes permisos");
  }
};

export const isUsuarioRole = (req, res, next) => {
  if (req.user.rol === "usuario") {
    next();
  } else {
    res.send("no tienes permisos");
  }
};
