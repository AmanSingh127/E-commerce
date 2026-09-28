const express = require('express')

const {
  getDashboardStats,
  getAdminOrders,
  updateOrderStatus
} = require('../controllers/adminController')

const router = express.Router()

// Dashboard statistics
router.get('/stats', getDashboardStats)

// Get all orders
router.get('/orders', getAdminOrders)

router.put('/orders/:id', updateOrderStatus)
module.exports = router