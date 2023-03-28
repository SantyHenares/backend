import ProductManager from "../dao/classes/ProductManager.js";
import CartManager from "../dao/classes/CartManager.js";
import { v4 } from "uuid";
import path from "path";
import cartModel from "../dao/models/cart.model.js";

const cartManager = new CartManager(
  path.resolve(process.cwd(), "public", "carts.json")
);

const productManager = new ProductManager(
  path.resolve(process.cwd(), "public", "products.json")
);

export const getCart = async (req, res) => {
  try {
    const cart = await cartModel.find();
    res.send({ payload: cart });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postCart = async (req, res) => {
  const newCart = {
    id: v4(),
    products: [],
  };

  try {
    const result = await cartModel.create(newCart);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getCartId = async (req, res) => {
  const cid = req.params;

  try {
    const cart = await cartModel.find(cid);
    if (!cart) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    res.send({
      status: "success",
      payload: cart,
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

export const getCartIdProductId = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const carts = await cartManager.getAll();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) {
      res.status(404).send("Carrito no encontrado");
      return;
    }
    const products = await productManager.getProducts();
    const product = products.find((product) => product.id == pid);
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    const productInCart = cart.products.find((product) => product.id === pid);
    if (productInCart) {
      productInCart.quantity++;
      await cartManager.writeAll(carts);
      res.send("Producto agregado al carrito");
      return;
    } else {
      cart.products.push({ id: pid, quantity: 1 });
      await cartManager.writeAll(carts);
      res.send("Producto agregado al carrito");
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteCartId = async (req, res) => {
  const cid = req.params;

  try {
    const result = await cartModel.deleteOne({ id: cid });
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteCartIdProductId = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const cart = await cartModel.findOne({ id: cid });
    const productDelete = cart.product.deleteOne({ id: pid });
    const result = await cartModel.updateOne({ id: cid }, productDelete);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const putCartId = async (req, res) => {};

export const putCartIdProductId = async (req, res) => {};

export const getPurchase = async (req, res) => {
  if ("2" == 2) {
    console.log("restar los productos del stock y continuar.");
  } else {
    console.log("No agregar al carrito");
  }
};
