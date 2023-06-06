import { productService } from "../dao/repository/index.repository.js";

export const getHome = (req, res) => {
  res.render("home", {});
};

export const getRealTimeProducts = (req, res) => {
  res.render("realTimeProducts", {});
};

export const getRenderProducts = (req, res) => {
  res.render("products", {});
};

export const getRenderCartId = (req, res) => {
  res.render("carts", {});
};

export const getRenderMocking = (req, res) => {
  res.render("mockingproducts", {});
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
    res.render("productDetail", product);
  } catch (error) {
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const getAddProduct = (req, res) => {
  res.render("addProduct", {});
};
