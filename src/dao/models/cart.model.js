import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  id: String,
  product: [],
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
