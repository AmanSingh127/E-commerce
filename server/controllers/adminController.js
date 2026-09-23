const { pool } = require('../config/db')

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {

    const [productResult] = await pool.query(
      'SELECT COUNT(*) AS totalProducts FROM products'
    )

    const [userResult] = await pool.query(
      'SELECT COUNT(*) AS totalUsers FROM users'
    )

    const [orderResult] = await pool.query(
      'SELECT COUNT(*) AS totalOrders FROM orders'
    )

    const [lowStockResult] = await pool.query(
      'SELECT COUNT(*) AS lowStock FROM products WHERE stock <= 5'
    )

    res.json({
      totalProducts: productResult[0].totalProducts,
      totalUsers: userResult[0].totalUsers,
      totalOrders: orderResult[0].totalOrders,
      lowStock: lowStockResult[0].lowStock
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  getDashboardStats
}