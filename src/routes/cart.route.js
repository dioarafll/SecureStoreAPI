

// src/routes/cart.route.js

const express = require('express')
const router = express.Router()
const cart = require('../controllers/cart.controller')

router.get('/',cart.getAllCarts)
router.get('/:id',cart.getSingleCart)
router.get('/user/:userid',cart.getCartsByUserId)

router.post('/',cart.addCart)
//router.post('/:id',cart.addtoCart)

router.put('/:id',cart.editCart)
router.patch('/:id',cart.editCart)
router.delete('/:id',cart.deleteCart)

module.exports = router
