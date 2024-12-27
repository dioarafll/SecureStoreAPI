

// src/controllers/cart.controller.js

const mongoose = require('mongoose');
const Cart = require('../models/cart.model');

/**
 * Get all carts with optional date range, limit, and sort order.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getAllCarts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;
    const startDate = req.query.startdate ? new Date(req.query.startdate) : new Date('1970-01-01');
    const endDate = req.query.enddate ? new Date(req.query.enddate) : new Date();

    const carts = await Cart.find({
      date: { $gte: startDate, $lt: endDate },
    })
      .select('-_id -products._id')  // Exclude _id from the result
      .limit(limit)
      .sort({ _id: sort });  // Use _id instead of id for sorting

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve carts', error: err.message });
  }
};

/**
 * Get carts by user ID with optional date range.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getCartsByUserId = async (req, res) => {
  try {
    const userId = req.params.userid;

    // Validate userId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid userId format.',
      });
    }

    const startDate = req.query.startdate ? new Date(req.query.startdate) : new Date('1970-01-01');
    const endDate = req.query.enddate ? new Date(req.query.enddate) : new Date();

    const carts = await Cart.find({
      userId: mongoose.Types.ObjectId(userId),
      date: { $gte: startDate, $lt: endDate },
    }).select('-_id -products._id'); // Exclude _id from the result

    if (!carts.length) {
      return res.status(404).json({ status: 'error', message: 'No carts found for the user' });
    }

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve carts', error: err.message });
  }
};

/**
 * Get a single cart by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getSingleCart = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate id as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid cart ID format.',
      });
    }

    // Use _id to query MongoDB document
    const cart = await Cart.findOne({ _id: mongoose.Types.ObjectId(id) }).select('-_id -products._id');

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve cart', error: err.message });
  }
};

/**
 * Menambahkan cart baru.
 * @param {Object} req - Objek request dari Express
 * @param {Object} res - Objek response dari Express
 */
module.exports.addCart = async (req, res) => {
  try {
    const { userId, date, products } = req.body;

    // Mengecek jika userId, date, dan products sudah ada dan valid
    if (!userId || !date || !products || !Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'Data cart tidak valid. Pastikan userId, date, dan products ada.',
      });
    }

    // Mengonversi userId menjadi ObjectId
    const userObjectId = mongoose.Types.ObjectId(userId);

    // Mengonversi productId di dalam array products menjadi ObjectId
    const productIds = products.map(product => ({
      productId: mongoose.Types.ObjectId(product.productId), // Mengonversi productId menjadi ObjectId
      quantity: product.quantity
    }));

    // Membuat dan menyimpan cart baru
    const newCart = new Cart({ userId: userObjectId, date, products: productIds });
    const savedCart = await newCart.save();

    // Mengirimkan response dengan status 201 jika berhasil
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Gagal menambahkan cart', error: err.message });
  }
};

/**
 * Edit an existing cart.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.editCart = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId, date, products } = req.body;

    if (!id || !userId || !date || !products || !Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid cart data. Ensure ID, userId, date, and products are provided.',
      });
    }

    // Validate userId and productId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid userId format.',
      });
    }

    products.forEach(product => {
      if (!mongoose.Types.ObjectId.isValid(product.productId)) {
        return res.status(400).json({
          status: 'error',
          message: `Invalid productId format for product ${product.productId}.`,
        });
      }
    });

    // Convert userId and productId to ObjectId
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        userId: mongoose.Types.ObjectId(userId),
        date,
        products: products.map(product => ({
          ...product,
          productId: mongoose.Types.ObjectId(product.productId),
        })),
      },
      { new: true, runValidators: true }
    ).select('-_id -products._id');

    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to update cart', error: err.message });
  }
};

/**
 * Delete a cart by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.deleteCart = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ status: 'error', message: 'Cart ID is required' });
    }

    // Validate id as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid cart ID format.',
      });
    }

    // Use _id to delete the document
    const deletedCart = await Cart.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) });

    if (!deletedCart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    res.status(200).json({ status: 'success', message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to delete cart', error: err.message });
  }
};
