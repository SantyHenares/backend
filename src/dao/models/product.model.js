import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  year: Number,
  genre: {
    type: String,
    enum: ["comedia", "horror", "animación", "drama", "romance", "acción"],
  },
  image: String,
  rate: Number,
  stock: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;
