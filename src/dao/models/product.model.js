import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  year: Number,
  genre: String,
  image: String,
  rate: Number,
  stock: Number,
});

const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;
