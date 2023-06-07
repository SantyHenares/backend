import { productService } from "../dao/repository/index.repository.js";
import { cartService } from "../dao/repository/index.repository.js";

export const getHome = (req, res) => {
  res.render("home", {});
};

export const getRenderProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.render("products", { products });
  } catch (error) {
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const getRenderCartId = (req, res) => {
  // const cartId = req.params.cid;
  // const cart = await cartService.getCartById(cartId);
  res.render("carts", {});
};

export const getForgotPassword = (req, res) => {
  res.render("forgotPassword", {});
};

export const getResetPassword = (req, res) => {
  const token = req.query.token;
  res.render("resetPassword", { token });
};

export const getProductDetail = async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getProductById(productId);
    res.render("productDetail", {
      product,
      cartId: req?.user?.cartId || undefined,
    });
  } catch (error) {
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const getAddProduct = (req, res) => {
  res.render("addProduct", {});
};
