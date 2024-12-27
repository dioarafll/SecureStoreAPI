

// src/controllers/auth.controller.js

const User = require('../models/user.model');
const { comparePassword } = require('../utils/bcrypt.util');
const { generateToken } = require('../utils/jwt.util');

/**
 * Handle user login and return a JWT token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username and password are required.',
      });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid username or password.',
      });
    }

    // Validate password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid username or password.',
      });
    }

    // Generate JWT token
    const token = generateToken({ id: user._id, username: user.username });

    // Respond with token
    res.json({
      status: 'success',
      message: 'Login successful.',
      token,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
    });
  }
};
