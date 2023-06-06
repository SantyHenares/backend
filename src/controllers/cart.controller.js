import { v4 } from "uuid";
import { cartService } from "../dao/repository/index.repository.js";
import productModel from "../dao/models/product.model.js";
import ticketModel from "../dao/models/ticket.model.js";

export const getCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartService.getCartById(cid);
    res.send({ payload: cart });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postCart = async (req, res) => {
  try {
    const result = await cartService.createCart();
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postCartIdProductId = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cartUpdated = await cartService.addProductToCart(cid, pid);
    res.redirect("/products");
    /*     res.json({
      status: "success",
      result: cartUpdated,
      message: "product added",
    }); */
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
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
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await cartService.deleteCartProduct(cid, pid);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const putCartId = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;
    const cart = await cartService.getCartById(cartId);
    cart.products = [...products];
    const response = await cartService.updateCart(cartId, cart);
    res.json({ status: "success", result: response, message: "cart updated" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

export const putCartIdProductId = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    const response = await cartService.updateQuantityInCart(
      cartId,
      productId,
      quantity
    );
    res.json({ status: "success", result: response, message: "cart updated" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

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
