

// src/validations/cart.validation.js


const { Joi } = require('../utils/joi.util');

const cartSchemas = {
  /**
   * Schema untuk membuat cart baru.
   */
  createCart: Joi.object({
    userId: Joi.objectId().required(),  // Validasi untuk MongoDB ObjectId untuk user
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.objectId().required(),  // Validasi MongoDB ObjectId untuk product
          quantity: Joi.number().integer().min(1).required(),  // Validasi quantity minimal 1
        })
      )
      .required(),  // Produk harus ada di dalam array
    total: Joi.number().positive().optional(),  // Total harga yang bersifat opsional
    date: Joi.date().optional(),  // Tanggal yang bersifat opsional
  }),

  /**
   * Schema untuk memperbarui cart.
   */
  updateCart: Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.objectId().required(),  // Validasi MongoDB ObjectId untuk product
          quantity: Joi.number().integer().min(1).optional(),  // Validasi quantity minimal 1, opsional
        })
      )
      .optional(),  // Produk bersifat opsional saat update
    total: Joi.number().positive().optional(),  // Total harga bersifat opsional
    date: Joi.date().optional(),  // Tanggal bersifat opsional
  }),

  /**
   * Schema untuk validasi ID cart.
   */
  cartId: Joi.object({
    id: Joi.objectId().required(),  // Validasi MongoDB ObjectId untuk cart
  }),

  /**
   * Schema untuk validasi userId yang terpisah.
   */
  userId: Joi.object({
    userId: Joi.objectId().required(),  // Validasi MongoDB ObjectId untuk userId
  }),

  /**
   * Schema untuk menambahkan produk ke dalam cart.
   */
  addToCart: Joi.object({
    productId: Joi.objectId().required(),  // Validasi MongoDB ObjectId untuk product
    quantity: Joi.number().integer().min(1).required(),  // Validasi quantity minimal 1
  }),
};

module.exports = cartSchemas;
