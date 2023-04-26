import productModel from "../models/product.model.js";

class ProductRepository {
  static async getAllProducts() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getProductsByid(id) {
    try {
      const getProductsByid = await productModel.findOne({ _id: id });
      return getProductsByid;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createProduct(newProduct) {
    try {
      const result = await productModel.insertOne(newProduct);
      return result;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateProduct(id, updateProduct) {
    try {
      const update = await productModel.updateOne({ _id: id }, updateProduct);
      return update;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteOneProduct(id) {
    try {
      const result = await productModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export { ProductRepository };
