import express from "express";
import path from "path";
import ProductManager from "./ProductManager.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager(
  path.resolve(process.cwd(), "public", "products.json")
);

app.get('/', (req, res) =>{
    res.send("¡Hola mundo!")
})

app.get("/products", async (req, res) => {
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

  app.post("/products", async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const newProduct = req.body;
      await productManager.addProduct(products, newProduct);
      res.send(newProduct);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get("/products/:id", async (req, res) => {
    try {
      const product = await productManager.getProductById(req.params.id);
      res.send(product);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

app.listen(port, ()=>{
    console.log(`Listening on por ${port}`)
})