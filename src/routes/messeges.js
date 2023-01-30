import { Router } from "express";
import messagesModel from "../dao/models/messages.model.js";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res) => {
  try {
    let users = await messagesModel.find();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

messagesRouter.get("/", (req, res) => {
  let messages = [];
  res.json(messages);
});
export default messagesRouter;
