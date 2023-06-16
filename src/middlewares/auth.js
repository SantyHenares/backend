export const isAdminRole = (req, res, next) => {
  if (req.user && req.user.rol === "admin") {
    next();
  } else {
    res.status(403).json({ message: "No autorizado" });
  }
};

export const isUsuarioRole = (req, res, next) => {
  if (req.user.rol === "usuario") {
    next();
  } else {
    res.send("no tienes permisos");
  }
};

export const checkRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "error", message: "Debes estar autenticado" });
    }
    const userRol = req.user.rol;
    if (!roles.includes(userRol)) {
      return res.status(403).json({
        status: "error",
        message: "No tienes permisos para esta accion",
      });
    }
    next();
  };
};
