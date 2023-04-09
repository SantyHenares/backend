import express from "express";

const sessionRouter = express.Router();

sessionRouter.get("/current", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({ status: "error", error: "User no logged." });
  }
});

export default sessionRouter;
