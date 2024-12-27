

// src/utils/joi.util.js

const JoiBase = require('joi');

/**
 * Ekstensi untuk menambahkan validasi MongoDB ObjectId ke Joi.
 */
const Joi = JoiBase.extend((joi) => ({
  type: 'objectId',
  base: joi.string(),
  messages: {
    'objectId.base': '"{{#label}}" must be a valid MongoDB ObjectId',
  },
  validate(value, helpers) {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/; // Pola untuk validasi ObjectId
    if (!objectIdRegex.test(value)) {
      return { value, errors: helpers.error('objectId.base') };
    }
  },
}));

/**
 * Opsi global untuk validasi menggunakan Joi.
 */
const joiOptions = {
  abortEarly: false, // Tampilkan semua error
  allowUnknown: true, // Izinkan properti tambahan
  stripUnknown: true, // Hapus properti yang tidak diizinkan
};

/**
 * Fungsi untuk memvalidasi data menggunakan schema Joi.
 * @param {Object} schema - Schema Joi.
 * @param {Object} data - Data yang akan divalidasi.
 * @returns {Object} - Hasil validasi.
 */
const validateSchema = (schema, data) => {
  return schema.validate(data, joiOptions);
};

module.exports = {
  Joi,
  validateSchema,
};
