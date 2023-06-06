import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";
import userModel from "../models/user.model.js";
import { ProductManager } from "../managers/productManager.js";
import { CartManager } from "../managers/cartManager.js";
import { UserManager } from "../managers/userManager.js";
import { ProductRepository } from "./products.repository.js";
import { CartRepository } from "./cart.repository.js";
import { UserRepository } from "./user.repository.js";

const productDao = new ProductManager(productModel);
const cartDao = new CartManager(cartModel);
const userDao = new UserManager(userModel);

export const productService = new ProductRepository(productDao);
export const cartService = new CartRepository(cartDao);
export const userService = new UserRepository(userDao);
