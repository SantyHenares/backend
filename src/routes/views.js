import express from "express";
import {
  getHome,
  getRenderCartId,
  getRenderProducts,
  getForgotPassword,
  getResetPassword,
  getProductDetail,
  getAddProduct,
  getUserRender,
} from "../controllers/views.controller.js";
import { checkAuth, checkRoles } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getHome);

router.get("/products", getRenderProducts);

router.get("/products/:pid", checkAuth, getProductDetail);

router.get("/cart", checkAuth, getRenderCartId);

router.get("/forgot-password", getForgotPassword);

router.get("/reset-password", getResetPassword);

router.get("/add-product", getAddProduct);

router.get("/users", checkRoles(["admin"]), getUserRender);

export default router;
