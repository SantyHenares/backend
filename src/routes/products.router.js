import express from "express";
import ProductManager from "../classes/ProductManager.js";
import path from "path";

const productsRouter = express.Router();

const productManager = new ProductManager(
    path.resolve(process.cwd(), "public", "products.json")
  );

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
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
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    res.send(product);
  } catch (err) {
     res.status(500).send(err.message);
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  try{
    await productManager.addProduct(newProduct);
    res.send(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newProduct = req.body;

  try {
    const products = await productManager.getProducts();
    const productIndex = products.findIndex((product) => product.id === pid);
    if (productIndex === -1) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    products[productIndex] = newProduct;
    await productManager.writeAll(products);
    res.send(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const productIndex = products.findIndex((product) => product.id == req.params.pid);
    if (productIndex === -1) {
      res.status(404).send("Producto no encontrado");
      return;
    }

    products.splice(productIndex, 1);
    await productManager.writeAll(products);
    res.send("Producto eliminado");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default productsRouter;