

// src/validations/auth..validation.js

const { Joi } = require("../utils/joi.util");

const authSchemas = {
  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
};

module.exports = authSchemas;
