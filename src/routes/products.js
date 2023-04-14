import express from "express";
import {
  getProducts,
  getProductsId,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/products.controller.js";
import { isAdminRole } from "../middlewares/auth.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:pid", getProductsId);

productsRouter.post("/", isAdminRole, postProducts);

productsRouter.put("/:pid", isAdminRole, putProducts);

productsRouter.delete("/:pid", isAdminRole, deleteProducts);

export default productsRouter;
