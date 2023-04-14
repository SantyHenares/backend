import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  product: [],
  user: String,
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
