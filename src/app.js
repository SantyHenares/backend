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

app.listen(port, ()=>{
    console.log(`Listening on por ${port}`)
})