import express from "express";
import {
  getProducts,
  getProductsId,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:pid", getProductsId);

productsRouter.post("/", postProducts);

productsRouter.put("/:pid", putProducts);

productsRouter.delete("/:pid", deleteProducts);

export default productsRouter;
