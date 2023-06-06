class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  //Abstraemos los métodos
  async addProduct(product) {
    const result = await this.dao.addProduct(product);
    return result;
  }

  async getProducts() {
    const products = await this.dao.getProducts();
    return products;
  }

  async getProductById(id) {
    const result = await this.dao.getProductById(id);
    return result;
  }

  async getPaginateProducts(query, options) {
    let response = await this.dao.getPaginateProducts(query, options);
    return response;
  }

  async updateProduct(productId, product) {
    let response = await this.dao.updateProduct(productId, product);
    return response;
  }

  async deleteProduct(productId) {
    let response = await this.dao.deleteProduct(productId);
    return response;
  }
}

export { ProductRepository };
