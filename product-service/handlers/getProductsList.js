'use strict';

const productsRepository = require("../repositories/productsRepository");

module.exports.handler = async (event) => {

  const products = await productsRepository.getProducts(0, 10);

  return {
    statusCode: 200,
    body: JSON.stringify(products) 
  };
};
