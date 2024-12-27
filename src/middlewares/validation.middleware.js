

// src/middlewares/validation.middleware.js

const { validateSchema } = require('../utils/joi.util');

/**
 * Middleware global untuk validasi data menggunakan schema Joi.
 * @param {Object} schema - Schema Joi yang digunakan.
 * @param {string} property - Properti request yang akan divalidasi (body, params, query).
 * @returns {Function} Middleware validasi.
 */
const validationMiddleware = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = validateSchema(schema, req[property]);
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((err) => err.message),
      });
    }
    req[property] = value; // Mutasi data untuk properti yang sudah divalidasi
    next();
  };
};

module.exports = validationMiddleware;
