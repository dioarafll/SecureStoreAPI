
// src/routes/swagger.route.js

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggers/index');

const router = express.Router();

/**
 * @swagger
 * /docs:
 *   get:
 *     summary: Menampilkan dokumentasi API.
 *     description: Endpoint untuk mengakses dokumentasi API menggunakan Swagger UI.
 *     responses:
 *       200:
 *         description: Dokumentasi Swagger berhasil dimuat.
 */
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
