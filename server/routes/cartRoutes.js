const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
} = require('../controllers/cartController')


router.get('/', authMiddleware, getCart)

router.post('/', authMiddleware, addToCart)

router.put('/:product_id', authMiddleware, updateCartItem)

router.delete('/:product_id', authMiddleware, removeFromCart)


module.exports = router