import express from "express";
import {
  getProducts,
  getProductsId,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/products.controller.js";
import { checkRoles, isAdminRole } from "../middlewares/auth.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:pid", getProductsId);

productsRouter.post("/", checkRoles(["premium", "admin"]), postProducts);

productsRouter.put("/:pid", checkRoles(["premium", "admin"]), putProducts);

productsRouter.delete(
  "/:pid",
  checkRoles(["premium", "admin"]),
  deleteProducts
);

export default productsRouter;
