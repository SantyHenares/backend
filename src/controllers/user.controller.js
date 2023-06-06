import { userService } from "../dao/repository/index.repository.js";

export const modifyUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await userService.getUserById(userId);
    const userRole = user.rol;
    if (userRole === "usuario") {
      user.rol = PremiumRole;
    } else if (userRole === PremiumRole) {
      user.rol = "usuario";
    } else {
      return res.json({
        status: "error",
        message: "No es posible cambiar el rol de un administrador",
      });
    }
    await userService.updateUser(userId, user);
    res.json({
      status: "success",
      message: `nuevo rol del usuario: ${user.rol}`,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await userService.getAll();
  res.send({ status: "success", payload: users });
};

export const getUser = async (req, res) => {
  const userId = req.params.uid;
  const user = await userService.getUserById(userId);
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  res.send({ status: "success", payload: user });
};

export const updateUser = async (req, res) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  const user = await userService.getUserById(userId);
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  const result = await userService.update(userId, updateBody);
  res.send({ status: "success", message: "User updated" });
};

export const deleteUsers = async (req, res) => {
  const result = await userService.deleteUsers(last_connection);
  res.send({ status: "success", message: "Users deleted" });
};
