export const generateLoginErrorInfo = (user) => {
  return `
        Una o mas campos no son validos
        Listado de propiedades requeridas
        Email es requerido y debe ser de tipo string, pero se recibio ${user.email}.
        La contraseña es incorrecta.
    `;
};
