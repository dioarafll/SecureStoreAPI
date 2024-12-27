

/**
 * @swagger
 * tags:
 *   - name: Carts
 *     description: API untuk mengelola keranjang belanja
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID pengguna yang memiliki keranjang
 *         date:
 *           type: string
 *           format: date
 *           description: Tanggal pembuatan atau pembaruan keranjang
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID produk dalam keranjang
 *               quantity:
 *                 type: integer
 *                 description: Jumlah produk
 *       required:
 *         - userId
 *         - date
 *         - products
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     tags: [Carts]
 *     summary: Mengambil semua keranjang
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Jumlah maksimal keranjang yang diambil
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           description: Urutan pengambilan data
 *       - in: query
 *         name: startdate
 *         schema:
 *           type: string
 *           format: date
 *           description: Tanggal awal filter
 *       - in: query
 *         name: enddate
 *         schema:
 *           type: string
 *           format: date
 *           description: Tanggal akhir filter
 *     responses:
 *       200:
 *         description: Daftar semua keranjang
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /carts/user/{userId}:
 *   get:
 *     tags: [Carts]
 *     summary: Mengambil keranjang berdasarkan userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna
 *       - in: query
 *         name: startdate
 *         schema:
 *           type: string
 *           format: date
 *           description: Tanggal awal filter
 *       - in: query
 *         name: enddate
 *         schema:
 *           type: string
 *           format: date
 *           description: Tanggal akhir filter
 *     responses:
 *       200:
 *         description: Keranjang pengguna
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     tags: [Carts]
 *     summary: Mengambil keranjang berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID keranjang
 *     responses:
 *       200:
 *         description: Detail keranjang
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /carts:
 *   post:
 *     tags: [Carts]
 *     summary: Menambahkan keranjang baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: Keranjang berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     tags: [Carts]
 *     summary: Mengedit keranjang
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID keranjang
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Keranjang berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     tags: [Carts]
 *     summary: Menghapus keranjang
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID keranjang
 *     responses:
 *       204:
 *         description: Keranjang berhasil dihapus
 */
