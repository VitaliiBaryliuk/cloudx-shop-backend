const dbClient = require("../db/dynamoDBClient");

class ProductsRepository {
  constructor(db) {
    this.db = db;
    this.tableParams = {
      TableName: process.env.PRODUCTS_TABLE,
    }
  }

  async getProducts(offset, count) {
    const response = await this.db.scan({ ...this.tableParams }).promise();
    return response.Items;
  }

  async getProductById(productId) {
    try {
      const product = await this.db.get({ 
        ...this.tableParams,
        Key: {
          id: productId
        }
      }).promise();
      if (!product.Item) throw Error('Product not found');
      return product.Item;
    } catch (error) {
      throw Error(error)
    }
  }

  async createProduct(productData) {
    try {
      const product = await this.db.put({ 
        ...this.tableParams,
        Item: productData
      }).promise();

      return product;
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = new ProductsRepository(dbClient);