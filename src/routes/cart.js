import express from "express";
import {
  getCart,
  postCart,
  postCartIdProductId,
  deleteCartId,
  deleteCartIdProductId,
  putCartId,
  putCartIdProductId,
  postPurchase,
} from "../controllers/cart.controller.js";
import { checkRoles, checkAuth } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/", postCart);

cartRouter.get("/:cid", getCart);

cartRouter.post(
  "/:cid/product/:pid",
  checkRoles(["usuario"]),
  postCartIdProductId
);

cartRouter.delete("/:cid", deleteCartId);

cartRouter.post("/delete/:cid/product/:pid", deleteCartIdProductId);

cartRouter.put("/:cid", putCartId);

cartRouter.put("/:cid/products/:pid ", putCartIdProductId);

cartRouter.post("/:cid/purchase", postPurchase);

export default cartRouter;
