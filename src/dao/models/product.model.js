import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;
