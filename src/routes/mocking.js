import express from "express";
import { listFakeProducts } from "../controllers/mocking.controller.js";

const mockingRouter = express.Router();

mockingRouter.get("/", listFakeProducts);

export default mockingRouter;
