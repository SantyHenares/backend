import express from "express";
import {
  getHome,
  getRealTimeProducts,
  getRenderCartId,
  getRenderProducts,
} from "../controllers/views.controller.js";

const router = express.Router();

router.get("/", getHome);

router.get("/realtimeproducts", getRealTimeProducts);

router.get("/products", getRenderProducts);

router.get("/carts/:cid", getRenderCartId);

export default router;
