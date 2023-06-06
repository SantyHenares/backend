import express from "express";
import {
  getHome,
  getRealTimeProducts,
  getRenderCartId,
  getRenderProducts,
  getRenderMocking,
  getForgotPassword,
  getResetPassword,
  getProductDetail,
  getAddProduct,
} from "../controllers/views.controller.js";

const router = express.Router();

router.get("/", getHome);

router.get("/realtimeproducts", getRealTimeProducts);

router.get("/products", getRenderProducts);

router.get("/products/:pid", getProductDetail);

router.get("/carts/:cid", getRenderCartId);

router.get("/mockingproducts", getRenderMocking);

router.get("/forgot-password", getForgotPassword);

router.get("/reset-password", getResetPassword);

router.get("/add-product", getAddProduct);

export default router;
