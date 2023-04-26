import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  rol: {
    type: String,
    required: true,
    enum: ["usuario", "admin", "premium"],
    default: "usuario",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
