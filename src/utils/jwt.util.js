

// src/utils/jwt.util.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Ganti dengan kunci rahasia yang lebih aman di lingkungan produksi

/**
 * Generate a JWT token.
 * @param {Object} payload - Data to encode in the token.
 * @param {string} [secret=SECRET_KEY] - Secret key for signing the token.
 * @param {Object} [options] - Additional JWT options (e.g., expiresIn).
 * @returns {string} - Signed JWT token.
 */
const generateToken = (payload, secret = SECRET_KEY, options = { expiresIn: '1h' }) => {
  return jwt.sign(payload, secret, options);
};

/**
 * Verify a JWT token.
 * @param {string} token - JWT token to verify.
 * @param {string} [secret=SECRET_KEY] - Secret key for verification.
 * @returns {Object} - Decoded token data.
 * @throws {Error} - Throws error if the token is invalid or expired.
 */
const verifyToken = (token, secret = SECRET_KEY) => {
  return jwt.verify(token, secret);
};

/**
 * Decode a JWT token without verification.
 * @param {string} token - JWT token to decode.
 * @returns {Object} - Decoded token data.
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
