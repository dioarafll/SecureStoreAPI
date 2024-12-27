

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the product
 *           example: 673c8b4583ef8c6795d1a1bc
 *         title:
 *           type: string
 *           description: The title of the product
 *           example: New Product
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 99.99
 *         description:
 *           type: string
 *           description: A brief description of the product
 *           example: This is a new product.
 *         image:
 *           type: string
 *           description: URL to the product image
 *           example: https://example.com/image.jpg
 *         category:
 *           type: string
 *           description: The category of the product
 *           example: electronics
 *     AddProductRequest:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - description
 *         - image
 *         - category
 *       properties:
 *         title:
 *           $ref: '#/components/schemas/Product/properties/title'
 *         price:
 *           $ref: '#/components/schemas/Product/properties/price'
 *         description:
 *           $ref: '#/components/schemas/Product/properties/description'
 *         image:
 *           $ref: '#/components/schemas/Product/properties/image'
 *         category:
 *           $ref: '#/components/schemas/Product/properties/category'
 *     EditProductRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/AddProductRequest'
 *     DeleteResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the operation
 *           example: success
 *         message:
 *           type: string
 *           description: Result message
 *           example: Product deleted successfully.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Limit the number of products
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *         description: Sort order of the products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 673c8b4583ef8c6795d1a1bc
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: electronics
 */

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products in a category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           example: electronics
 *         description: The category name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Limit the number of products
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: desc
 *         description: Sort order of the products
 *     responses:
 *       200:
 *         description: List of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProductRequest'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Edit a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 673c8b4583ef8c6795d1a1bc
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditProductRequest'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 673c8b4583ef8c6795d1a1bc
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *       404:
 *         description: Product not found
 */
