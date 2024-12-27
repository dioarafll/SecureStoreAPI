

// src/controllers/product.controller.js

const Product = require('../models/product.model');

/**
 * Get all products with optional limit and sort order.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getAllProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    const products = await Product.find()
      .limit(limit)
      .sort({ _id: sort }); // Sort by MongoDB's _id field

    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch products.' });
  }
};

/**
 * Get a product by its ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id); // Use findById for MongoDB's _id
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch product.' });
  }
};

/**
 * Get distinct product categories.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch categories.' });
  }
};

/**
 * Get products within a specific category.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getProductsInCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    const products = await Product.find({ category })
      .limit(limit)
      .sort({ _id: sort }); // Sort by MongoDB's _id field

    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products in category:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch products.' });
  }
};

/**
 * Add a new product to the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.addProduct = async (req, res) => {
  try {
    const { title, price, description, image, category } = req.body;

    if (!title || !price || !description || !image || !category) {
      return res.status(400).json({ status: 'error', message: 'All fields are required.' });
    }

    const newProduct = new Product({
      title,
      price,
      description,
      image,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ status: 'error', message: 'Failed to add product.' });
  }
};

/**
 * Edit an existing product by its ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, image, category } = req.body;

    if (!id || !title || !price || !description || !image || !category) {
      return res.status(400).json({ status: 'error', message: 'All fields are required.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id, // Use _id for update
      { title, price, description, image, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ status: 'error', message: 'Failed to update product.' });
  }
};

/**
 * Delete a product by its ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: 'error', message: 'Product ID is required.' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id); // Use findByIdAndDelete for MongoDB's _id

    if (!deletedProduct) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }

    res.status(200).json({ status: 'success', message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ status: 'error', message: 'Failed to delete product.' });
  }
};
