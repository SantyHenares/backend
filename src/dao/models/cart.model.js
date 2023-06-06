import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    required: true,
    default: [],
  },
});

cartSchema.pre("find", function () {
  this.populate("products.id");
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
