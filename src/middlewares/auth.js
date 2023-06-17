export const checkAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send(
      `<div>Debes estar autenticado <a href="/login">intente aquí.</a></div>`
    );
  }
};

export const checkRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.send(
        `<div>Debes estar autenticado <a href="/login">intente aquí.</a></div>`
      );
    }
    const userRol = req.user.rol;
    if (!roles.includes(userRol)) {
      return res.send(
        `<div>No tienes permisos para esta accion, <a href="/">volver al home.</a></div>`
      );
    }
    next();
  };
};
