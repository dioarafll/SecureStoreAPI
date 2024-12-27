

// src/validations/product.validation.js

const { Joi } = require('../utils/joi.util');

const productSchemas = {
  createProduct: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    category: Joi.string().optional(),
  }),
  updateProduct: Joi.object({
    title: Joi.string().optional(),
    price: Joi.number().optional(),
    description: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    category: Joi.string().optional(),
  }),
  // Validasi untuk ID produk (MongoDB ObjectId)
  productId: Joi.object({
    id: Joi.objectId().required(), // Menggunakan ekstensi objectId
  }),
  category: Joi.object({
    category: Joi.string().required(),
  }),
};

module.exports = productSchemas;
