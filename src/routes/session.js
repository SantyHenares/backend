import express from "express";

const sessionRouter = express.Router();

sessionRouter.get("/current");

export default sessionRouter;
