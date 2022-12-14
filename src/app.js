import express from "express";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import { Server } from "socket.io";

const app = express();
const port = 8080; //Puerto
const httpServer = app.listen(port, ()=>{
    console.log(`Listening on por ${port}`)
})
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get('/', (req, res) =>{
    res.send("Hola");
})

socketServer.on('connection', socket  => {
    console.log("Nuevo cliente conectado.");
})