import ProductManager from "../dao/classes/ProductManager.js";
import CartManager from "../dao/classes/CartManager.js";
import { v4 } from "uuid";
import path from "path";
import cartModel from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";
import ticketModel from "../dao/models/ticket.model.js";

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
    products: [],
    user: user.mail,
  };

  try {
    const result = await cartModel.insertOne(newCart);
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getCartId = async (req, res) => {
  const cid = req.params;

  try {
    const cart = await cartModel.find({ _id: cid });
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

export const postCartIdProductId = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const carts = await cartManager.getAll();
    const cart = carts.find((cart) => cart._id === cid);
    if (!cart) {
      res.status(404).send("Carrito no encontrado");
      return;
    }
    const products = await productManager.getProducts();
    const product = products.find((product) => product._id == pid);
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    const productInCart = cart.products.find((product) => product._id === pid);
    if (productInCart) {
      productInCart.quantity++;
      await cartManager.writeAll(carts);
      res.send("Producto agregado al carrito");
      return;
    } else {
      cart.products.push({ _id: pid, quantity: 1 });
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
    const result = await cartModel.deleteOne({ _id: cid });
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteCartIdProductId = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const cart = await cartModel.findOne({ _id: cid });
    const productDelete = cart.product.deleteOne({ _id: pid });
    const result = await cartModel.updateOne({ _id: cid }, productDelete);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const putCartId = async (req, res) => {};

export const putCartIdProductId = async (req, res) => {};

export const getPurchase = async (req, res) => {
  const cid = req.params.cid;

  try {
    let amount = 0;
    const cart = await cartModel.findOne({ _id: cid });
    const listProduct = await productModel.find();

    // Actualizar stock y calcular el total de la compra

    for (const element of cart.product) {
      const product = listProduct.find((p) => p._id === element._id);
      if (product.stock >= element.cantidad) {
        await productModel.updateOne(
          { _id: element._id },
          { stock: product.stock - element.cantidad }
        );
        amount += element.price * element.cantidad;
        await cartModel.updateOne(
          { _id: cart._id },
          { $pull: { product: { _id: element._id } } }
        );
      } else {
        console.log(element.name + " no se agregó al proceso de compra.");
      }
    }

    // Crear y guardar el ticket de compra

    const newTicket = {
      code: v4(),
      purchase_datetime: moment().format("LLL"),
      amount: amount,
      purchase: cart.mail,
    };
    await ticketModel.insert(newTicket);

    res.send({
      status: "success",
      payload: newTicket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
