

// src/routes/product.route.js

const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const { productValidation } = require('../validations');

router.get('/', product.getAllProducts);

router.get(
  '/categories',
  product.getProductCategories
);

router.get(
  '/category/:category',
  validationMiddleware(productValidation.category, 'params'),
  product.getProductsInCategory
);

router.get(
  '/:id',
  validationMiddleware(productValidation.productId, 'params'),
  product.getProduct
);

router.post(
  '/',
  validationMiddleware(productValidation.createProduct),
  product.addProduct
);

router.put(
  '/:id',
  [
    validationMiddleware(productValidation.productId, 'params'),
    validationMiddleware(productValidation.updateProduct),
  ],
  product.editProduct
);

router.patch(
  '/:id',
  [
    validationMiddleware(productValidation.productId, 'params'),
    validationMiddleware(productValidation.updateProduct),
  ],
  product.editProduct
);

router.delete(
  '/:id',
  validationMiddleware(productValidation.productId, 'params'),
  product.deleteProduct
);

module.exports = router;
