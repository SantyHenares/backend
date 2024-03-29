class ProductManager {
  constructor(model) {
    this.model = model;
  }

  async addProduct(product) {
    try {
      const data = await this.model.create(product);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async getProducts() {
    try {
      const data = await this.model.find();
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error get all ${error}`);
    }
  }

  async getPaginateProducts(query = {}, options = {}) {
    try {
      const result = await this.model.paginate(query, options);
      return result;
    } catch (error) {
      throw new Error(`Error get all ${error}`);
    }
  }

  async getProductById(id) {
    try {
      const data = await this.model.findById(id);
      if (data) {
        const response = JSON.parse(JSON.stringify(data));
        return response;
      }
      throw new Error(`No se encontró el producto`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(id, product) {
    try {
      const data = await this.model.findByIdAndUpdate(id, product, {
        new: true,
      });
      if (!data) {
        throw new Error(`Error al actualizar: no se encontró el id ${id}`);
      }
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al actualizar: no se encontró el id ${id}`);
    }
  }

  async deleteProduct(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        throw new Error(`Error al borrar: no se encontró el id ${id}`);
      }
      return { message: "producto eliminado" };
    } catch (error) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`);
    }
  }
}

export { ProductManager };
