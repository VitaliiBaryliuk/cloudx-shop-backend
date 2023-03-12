const dbClient = require("../db/dynamoDBClient");

class StocksRepository {
  constructor(db) {
    this.db = db;
    this.tableParams = {
      TableName: process.env.STOCKS_TABLE
    }
  }

  async getStockByProductId(productId) {
    try {
      const stock = await this.db.get({ 
        ...this.tableParams,
        Key: {
          product_id: productId 
        }
      }).promise();
      return stock.Item ?? null;
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = new StocksRepository(dbClient);