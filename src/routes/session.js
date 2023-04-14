import express from "express";
import { UserDTO } from "../dao/dto/user.dto.js";

const sessionRouter = express.Router();

sessionRouter.get("/current", (req, res) => {
  if (req.user) {
    const resultDto = new UserDTO(req.user);
    res.send(resultDto);
  } else {
    res.send({ status: "error", error: "User no logged." });
  }
});

export default sessionRouter;
