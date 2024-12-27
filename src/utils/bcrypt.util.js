

// utils/bcrypt.util.js

const bcrypt = require('bcryptjs');

/**
 * Hash a plain text password.
 * @param {string} password - Plain text password to hash.
 * @param {number} saltRounds - Number of salt rounds for bcrypt (default: 10).
 * @returns {Promise<string>} - Hashed password.
 */
const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.error('Error hashing password:', err);
    throw new Error('Failed to hash password.');
  }
};

/**
 * Compare a plain text password with a hashed password.
 * @param {string} password - Plain text password.
 * @param {string} hashedPassword - Hashed password.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error('Error comparing passwords:', err);
    throw new Error('Failed to compare passwords.');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
