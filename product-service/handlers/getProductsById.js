'use strict';

const productsRepository = require("../repositories/productsRepository");


module.exports.handler = async (event) => {
  const { productId } = event.pathParameters;
  
  try {
    const product = await productsRepository.getProductById(productId)    
    return {
      statusCode: 200,
      body: JSON.stringify(product)
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Product not found' })
    };
  }

};