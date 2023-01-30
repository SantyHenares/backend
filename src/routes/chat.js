import express from "express";

const chatRouter = express.Router();

chatRouter.get("/", (req, res) => {
  res.render("chat", { title: "Chat" });
});

export default chatRouter;
