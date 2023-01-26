import fs  from "fs";

class CartManager {

    constructor(path){
        this.path = path;
    }
  
    fileExists() {
      return fs.existsSync(this.path);
    }

    async getAll() {
        try {
          const data = await fs.promises.readFile(this.path);
          return JSON.parse(data);
        } catch (err) {
          throw err;
        }
      }
  
    async writeAll(data) {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(data));
      } catch (err) {
        throw err;
      }
    }

    async addProduct(cartId, productId) {
      try {
        const carts = await this.getAll();
  
        const cart = carts.find((cart) => cart.id === cartId);
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
  
        cart.products.push(productId);
  
        await this.writeAll(carts);
      } catch (err) {
        throw err;
      }
    }
  
    async deleteProduct(cartId, productId) {
      try {
        const carts = await this.getAll();
  
        const cart = carts.find((cart) => cart.id === cartId);
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
  
        const index = cart.products.findIndex((product) => product === productId);
        if (index === -1) {
          throw new Error("Producto no encontrado");
        }
  
        cart.products.splice(index, 1);
  
        await this.writeAll(carts);
      } catch (err) {
        throw err;
      }
    }
  }
  
  export default CartManager;