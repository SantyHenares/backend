import express from "express";
import {
  getCart,
  postCart,
  getCartId,
  postCartIdProductId,
  deleteCartId,
  deleteCartIdProductId,
  putCartId,
  putCartIdProductId,
  getPurchase,
} from "../controllers/cart.controller.js";
import { isUsuarioRole } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/", getCart);

cartRouter.post("/", postCart);

cartRouter.get("/:cid", getCartId);

cartRouter.post("/:cid/product/:pid", isUsuarioRole, postCartIdProductId);

cartRouter.delete("/:cid", deleteCartId);

cartRouter.delete("/:cid/product/:pid", deleteCartIdProductId);

cartRouter.put("/cid", putCartId);

cartRouter.put("/:cid/products/:pid ", putCartIdProductId);

cartRouter.get("/:cid/purchase", getPurchase);

export default cartRouter;
