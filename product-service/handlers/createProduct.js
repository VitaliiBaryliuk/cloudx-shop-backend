'use strict';

const { v4: uuidv4 } = require('uuid');

const productsRepository = require('../repositories/productsRepository');
const validate = require('../helpers/validate');

const productValidationSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "integer" },
    count: { type: "integer" },
  },
  required: ['title', 'description', 'price'],
  additionalProperties: false,
}

module.exports.handler = async (event) => {
  const productData = JSON.parse(event.body);
  const validation = validate(productValidationSchema, productData);
  if (validation.errors) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: JSON.stringify(validation.errors) })
    }
  }
  try {
    const product = await productsRepository.createProduct({
      id: uuidv4(),
      ...productData
    });
    return {
      statusCode: 200,
      body: JSON.stringify(product)
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Product creation failure' })
    };
  }
};