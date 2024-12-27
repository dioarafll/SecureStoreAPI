

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and Authorization API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: dioarafi
 *         password:
 *           type: string
 *           description: The password of the user
 *           example: newsecurepassword
 *     LoginResponseSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the request
 *           example: success
 *         message:
 *           type: string
 *           description: Success message
 *           example: Login successful.
 *         token:
 *           type: string
 *           description: JWT token for authorization
 *           example: your_jwt_token
 *     LoginResponseError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the request
 *           example: error
 *         message:
 *           type: string
 *           description: Error message
 *           example: Invalid username or password.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseSuccess'
 *       400:
 *         description: Bad Request (Missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseError'
 *       401:
 *         description: Unauthorized (Invalid username or password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseError'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/protected-route:
 *   get:
 *     summary: Access a protected route
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Access granted to protected route.
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized access.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
