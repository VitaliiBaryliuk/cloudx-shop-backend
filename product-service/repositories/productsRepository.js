const mockDataProvider = require("../db/mockDataProvider");

class ProductsRepository {
  constructor(db) {
    this.db = db;
  }

  async getProducts(offset, count) {
    return await this.db.getProducts();
  }

  async getProductById(productId) {
    try {
      const product = await this.db.getProductById(productId);
      if (!product) throw Error('Product not found');
      return product;
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = new ProductsRepository(mockDataProvider);