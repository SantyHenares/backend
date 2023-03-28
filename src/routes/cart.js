import express from "express";
import {
  getCart,
  postCart,
  getCartId,
  getCartIdProductId,
  deleteCartId,
  deleteCartIdProductId,
  putCartId,
  putCartIdProductId,
  getPurchase,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/", getCart);

cartRouter.post("/", postCart);

cartRouter.get("/:cid", getCartId);

cartRouter.post("/:cid/product/:pid", getCartIdProductId);

cartRouter.delete("/:cid", deleteCartId);

cartRouter.delete("/:cid/product/:pid", deleteCartIdProductId);

cartRouter.put("/cid", putCartId);

cartRouter.put("/:cid/products/:pid ", putCartIdProductId);

cartRouter.get("/:cid/purchase", getPurchase);

export default cartRouter;
