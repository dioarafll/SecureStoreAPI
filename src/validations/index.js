

// src/validation/index.js

const userValidation = require('./user.validation');
const productValidation = require('./product.validation');
const cartValidation = require('./cart.validation');
const authValidation = require('./auth.validation');

module.exports = {
  userValidation,
  productValidation,
  cartValidation,
  authValidation
};
