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


// @desc    Get all orders for admin
// @route   GET /api/admin/orders
const getAdminOrders = async (req, res) => {
  try {

    const [orders] = await pool.query(`
      SELECT
        o.order_id,
        o.total_amount,
        o.status,
        o.payment_method,
        o.payment_status,
        o.created_at,

        a.name,
        a.phone,
        a.street,
        a.city,
        a.state,
        a.pincode,
        a.country

      FROM orders o

      JOIN addresses a
        ON o.address_id = a.address_id

      ORDER BY o.created_at DESC
    `)

    res.json(orders)

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const updateOrderStatus = async (req, res) => {
  try {

    const { id } = req.params
    const { status } = req.body

    const allowedStatuses = [
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled'
    ]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid order status'
      })
    }

    await pool.query(
      `UPDATE orders
       SET status = ?
       WHERE order_id = ?`,
      [status, id]
    )

    res.json({
      message: 'Order status updated successfully'
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}


module.exports = {
  getDashboardStats,
  getAdminOrders,
  updateOrderStatus
}