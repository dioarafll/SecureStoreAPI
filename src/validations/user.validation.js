
// src/validation/user.validation.js

const { Joi } = require('../utils/joi.util');

const userSchemas = {
  // Validasi untuk pembuatan user baru
  createUser: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.number().required(),
      zipcode: Joi.string().required(),
      geolocation: Joi.object({
        lat: Joi.string().required(),
        long: Joi.string().required(),
      }).required(),
    }).required(),
    phone: Joi.string().pattern(/^\d+$/).required(),
  }),

  // Validasi untuk pembaruan user
  updateUser: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string().min(8),
    firstname: Joi.string(),
    lastname: Joi.string(),
    address: Joi.object({
      city: Joi.string(),
      street: Joi.string(),
      number: Joi.number(),
      zipcode: Joi.string(),
      geolocation: Joi.object({
        lat: Joi.string(),
        long: Joi.string(),
      }),
    }),
    phone: Joi.string().pattern(/^\d+$/),
  }),

  // Validasi untuk ID pengguna
  userId: Joi.object({
    id: Joi.objectId().required(),
  }),
};

module.exports = userSchemas;
