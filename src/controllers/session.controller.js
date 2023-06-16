import { UserDTO } from "../dao/dto/user.dto.js";

export const getCurrent = async (req, res) => {
  if (req.user) {
    const resultDto = new UserDTO(req.user);
    res.send(resultDto);
  } else {
    res.send({ status: "error", error: "User no logged." });
  }
};

export const postLogOut = async (req, res) => {
  req.session.destroy((error) => {
    if (!error) res.send("logout ok!");
    else res.send({ status: "Logout ERROR", body: error });
  });
};
