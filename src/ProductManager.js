import fs from "fs";
import path from "path";

class ProductManager {
  constructor(path){
      this.path = path;
  }

  fileExists() {
    return fs.existsSync(this.path);
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      if (this.fileExists()) {
        fs.readFile("./products.json", (err, data) => {
          if (err) {
            return console.log("Error al leer el archivo");
          }
          this.products = JSON.parse(data);
          this.products.push({...product, id: this.products.length + 1});
          fs.writeFile("./products.json", JSON.stringify(this.products), (err) => {
            if (err) {
              return console.log("Error al escribir el archivo");
            }
            resolve();
          });
        });
      } else {
        this.products.push({...product, id: this.products.length + 1});
        fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");
        resolve();
      }
    });
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.products = JSON.parse(data);
        resolve(this.products);
      });
    });
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.products = JSON.parse(data);
        const product = this.products.find((product) => product.id == id);
        resolve(product);
      });
    });
  }

  deleteProductById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.products = JSON.parse(data);
        this.products = this.products.filter((product) => product.id != id);
        fs.writeFile;
      });
    });
  }

  updateProduct(id, update){
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, "utf8", (err, data) => {
        if(err){
          reject(err);
        }
        this.products = JSON.parse(data);
        const productsIndex = this.products.findIndex((product) => product.id == id);
        this.products[productsIndex] = update;
        fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
    });
  }
}

export default ProductManager;