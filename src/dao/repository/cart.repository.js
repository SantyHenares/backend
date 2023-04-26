import cartModel from "../models/cart.model.js";

class CartRepository {
  static async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createCart(newCart) {
    try {
      const result = await cartModel.insertOne(newCart);
      return result;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getCartId(id) {
    try {
      const cart = await cartModel.find({ _id: id });
      return cart;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteCartId(id) {
    try {
      const result = await cartModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateCart(id, update) {
    try {
      const result = await cartModel.updateOne({ _id: id }, update);
      return result;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export { CartRepository };
