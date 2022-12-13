const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor(){
      this.products = [];
      this.file = path.join(__dirname, "products.json");
  }

  fileExists() {
    return fs.existsSync(this.file);
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
        fs.writeFileSync(this.file, JSON.stringify(this.products), "utf8");
        resolve();
      }
    });
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf8", (err, data) => {
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
      fs.readFile(this.file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.products = JSON.parse(data);
        const product = this.products.find((product) => product.id === id);
        resolve(product);
      });
    });
  }

  deleteProductById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        this.products = JSON.parse(data);
        this.products = this.products.filter((product) => product.id !== id);
        fs.writeFile;
      });
    });
  }

  updateProduct(id, update){
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf8", (err, data) => {
        if(err){
          reject(err);
        }
        this.products = JSON.parse(data);
        const product = this.products.getProductById(id);
        product.update = "actualizar";
        this.products.deleteProductById(id)
        this.products.push({...product, id: this.products.length + 1});
        fs.writeFileSync(this.file, JSON.stringify(this.products), "utf8");
        resolve();
      });
    });
  }
}

module.exports = ProductManager;