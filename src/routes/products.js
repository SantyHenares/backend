import express from "express";
import ProductManager from "../dao/classes/ProductManager.js";
import path from "path";
import productModel from "../dao/models/product.model.js";

const productsRouter = express.Router();

// const productManager = new ProductManager(
//   path.resolve(process.cwd(), "public", "products.json")
// );

productsRouter.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    const limit = req.query.limit;
    let limitedProducts;
    if (limit) {
      limitedProducts = products.slice(0, limit);
    }
    res.send(limitedProducts || products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const product = await productModel.findOne({ id: pid });
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
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const result = await productModel.insertMany(newProduct);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;

  try {
    const result = await productModel.updateOne({ id: pid }, updateProduct);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const pid = req.params;
  try {
    const result = await productModel.deleteOne({ id: pid });
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default productsRouter;
