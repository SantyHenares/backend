import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  id: String,
  totalPrice: Number,
  product: [],
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
