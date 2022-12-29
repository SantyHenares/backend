import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.get('/', (req, res) =>{
    res.send("¡Hola mundo!")
})


  // app.post("/products", async (req, res) => {
  //   try {
  //     const products = await productManager.getProducts();
  //     const newProduct = req.body;
  //     await productManager.addProduct(products, newProduct);
  //     res.send(newProduct);
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });


app.listen(port, ()=>{
    console.log(`Listening on por ${port}`)
})