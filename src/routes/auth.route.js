

// src/routes/auth.route.js

const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const { authValidation } = require("../validations");

router.post(
  "/login",
  validationMiddleware(authValidation.login),
  auth.login
);

module.exports = router;
