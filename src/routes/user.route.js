

// src/src/routes/user.route.js

const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const { userValidation } = require('../validations');

router.get('/', user.getAllUser);

router.get(
  '/:id',
  validationMiddleware(userValidation.userId, 'params'),
  user.getUser
);

router.post(
  '/',
  validationMiddleware(userValidation.createUser),
  user.addUser
);

router.put(
  '/:id',
  [
    validationMiddleware(userValidation.userId, 'params'),
    validationMiddleware(userValidation.updateUser),
  ],
  user.editUser
);

router.patch(
  '/:id',
  [
    validationMiddleware(userValidation.userId, 'params'),
    validationMiddleware(userValidation.updateUser),
  ],
  user.editUser
);

router.delete(
  '/:id',
  validationMiddleware(userValidation.userId, 'params'),
  user.deleteUser
);

module.exports = router;
