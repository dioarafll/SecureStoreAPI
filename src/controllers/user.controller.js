
// src/controllers/user.js
const User = require('../models/user.model');
const { hashPassword } = require('../utils/bcrypt.util');


/**
 * Get all users with optional limit and sort order.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getAllUser = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    const users = await User.find()
      .select('-_id') // Exclude the MongoDB _id field
      .limit(limit)
      .sort({ _id: sort });

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch users.' });
  }
};

/**
 * Get a single user by MongoDB ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select('-_id'); // Use findById for MongoDB _id

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch user.' });
  }
};

/**
 * Add a new user to the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.addUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ status: 'error', message: 'Data is undefined.' });
    }

     // Hash the password before saving to the database
    const hashedPassword = await hashPassword(req.body.password);

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      name: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
      address: {
        city: req.body.address?.city,
        street: req.body.address?.street,
        number: req.body.address?.number,
        zipcode: req.body.address?.zipcode,
        geolocation: {
          lat: req.body.address?.geolocation?.lat,
          long: req.body.address?.geolocation?.long,
        },
      },
      phone: req.body.phone,
    });

    const savedUser = await user.save();
    console.log('User added:', savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ status: 'error', message: 'Failed to add user.' });
  }
};

/**
 * Edit an existing user by MongoDB ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Validasi input data dan ID
    if (!id || !req.body) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data or missing ID.',
      });
    }

    // Jika password ada di body, hash password terlebih dahulu
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await hashPassword(req.body.password);
    }

    // Siapkan data untuk diperbarui
    const updateData = {
      email: req.body.email,
      username: req.body.username,
      name: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
      address: {
        city: req.body.address?.city,
        street: req.body.address?.street,
        number: req.body.address?.number,
        zipcode: req.body.address?.zipcode,
        geolocation: {
          lat: req.body.address?.geolocation?.lat,
          long: req.body.address?.geolocation?.long,
        },
      },
      phone: req.body.phone,
    };

    // Jika ada password baru, masukkan password yang sudah di-hash
    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    // Perbarui user di database
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Mengembalikan dokumen yang sudah diperbarui
      runValidators: true, // Menjalankan validasi dari skema
    });

    // Jika user tidak ditemukan
    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }

    // Respon sukses
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (err) {
    console.error('Error editing user:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user.',
      error: err.message,
    });
  }
};

/**
 * Delete a user by MongoDB ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    console.log('User deleted:', deletedUser);
    res.json({ status: 'success', message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ status: 'error', message: 'Failed to delete user.' });
  }
};
