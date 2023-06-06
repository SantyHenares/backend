import { productService } from "../dao/repository/index.repository.js";

export const getProducts = async (req, res) => {
  try {
    let products = await productService.getProducts();
    const limit = req.query.limit;
    let limitedProducts;
    if (limit) {
      limitedProducts = products.slice(0, limit);
    }
    res.send(limitedProducts || products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getProductsId = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productService.getProductById(pid);
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    res.send({
      status: "success",
      payload: product,
      totalPages: 1,
      prevPage: 1,
      nextPage: 1,
      page: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevLink: null,
      nextLink: null,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postProducts = async (req, res) => {
  const newProduct = req.body;
  newProduct.price = Number(newProduct.price);
  newProduct.stock = Number(newProduct.stock);
  newProduct.owner = req.user._id;
  try {
    const result = await productService.addProduct(newProduct);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const putProducts = async (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;
  updateProduct.price = Number(updateProduct.price);
  updateProduct.stock = Number(updateProduct.stock);
  try {
    const result = await productService.updateProduct(
      { _id: pid },
      updateProduct
    );
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteProducts = async (req, res) => {
  const pid = req.params;
  try {
    if (
      (req.user.rol === "premium" && product.owner == req.user._id) ||
      req.user.rol === "admin"
    ) {
      const result = await productService.deleteProduct({ _id: pid });
      res.send({ status: "success", payload: result });
    } else {
      res.json({
        status: "error",
        message: "No tienes permisos para borrar este producto",
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
