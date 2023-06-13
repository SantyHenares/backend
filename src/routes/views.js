import express from "express";
import {
  getHome,
  getRenderCartId,
  getRenderProducts,
  getForgotPassword,
  getResetPassword,
  getProductDetail,
  getAddProduct,
} from "../controllers/views.controller.js";

const router = express.Router();

router.get("/", getHome);

router.get("/products", getRenderProducts);

router.get("/products/:pid", getProductDetail);

router.get("/cart", getRenderCartId);

router.get("/forgot-password", getForgotPassword);

router.get("/reset-password", getResetPassword);

router.get("/add-product", getAddProduct);

export default router;
