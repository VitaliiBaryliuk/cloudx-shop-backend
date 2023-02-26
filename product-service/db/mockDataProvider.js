const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile)

class MockData {
  async getProducts() {
    const response = await readFileAsync(`${process.env.PWD}/mocks/products.json`, { encoding: 'utf-8' })
    try {
      const products = JSON.parse(response);
      return products;
    } catch (err) {
      throw Error(err)
    }
  }

  async getProductById(productId) {
    const response = await readFileAsync(`${process.env.PWD}/mocks/products.json`, { encoding: 'utf-8' })
    try {
      const products = JSON.parse(response);
      const product = products.find(product => product.id === productId);
      return product;
    } catch (err) {
      throw Error(err)
    }
  }
}

module.exports = new MockData();