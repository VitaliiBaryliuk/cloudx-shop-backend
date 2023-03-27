'use strict';

const productsRepository = require('../repositories/productsRepository');
const stocksRepository = require('../repositories/stocksRepository');

module.exports.handler = async (event) => {
  try {
    const products = await productsRepository.getProducts();
    const productsWithStock = [];
    for (let i = 0; i < products.length; i++) {
      const stock = await stocksRepository.getStockByProductId(products[i].id);
      productsWithStock.push({
        ...products[i],
        count: stock?.count ?? null
      })
    }
    return {
      statusCode: 200,
      body: JSON.stringify(productsWithStock) 
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: error
    };
  }
};
