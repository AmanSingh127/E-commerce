const { pool } = require('../config/db')

const createOrder = async (req, res) => {
  const connection = await pool.getConnection()

  try {
    const user_id = req.user.user_id

    const {
      name,
      phone,
      street,
      city,
      state,
      pincode,
      country,
      items
    } = req.body

    // Check that cart/order has items
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: 'No items in order'
      })
    }

    // Calculate total
    let total_amount = 0

    for (const item of items) {
      const [products] = await connection.query(
        'SELECT price, stock FROM products WHERE product_id = ?',
        [item.product_id]
      )

      if (products.length === 0) {
        return res.status(404).json({
          message: `Product ${item.product_id} not found`
        })
      }

      if (products[0].stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product ${item.product_id}`
        })
      }

      total_amount += Number(products[0].price) * item.quantity
    }

    // Start transaction
    await connection.beginTransaction()

    // Save address
    const [addressResult] = await connection.query(
      `INSERT INTO addresses
      (user_id, name, phone, street, city, state, pincode, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        name,
        phone,
        street,
        city,
        state,
        pincode,
        country || 'India'
      ]
    )

    const address_id = addressResult.insertId

    // Create order
    const [orderResult] = await connection.query(
      `INSERT INTO orders
      (user_id, address_id, total_amount, status, payment_method, payment_status)
      VALUES (?, ?, ?, 'pending', 'Cash on Delivery', 'pending')`,
      [
        user_id,
        address_id,
        total_amount
      ]
    )

    const order_id = orderResult.insertId

    // Add products to order_items
    for (const item of items) {

      const [products] = await connection.query(
        'SELECT price FROM products WHERE product_id = ?',
        [item.product_id]
      )

      await connection.query(
        `INSERT INTO order_items
        (order_id, product_id, quantity, price_at_purchase)
        VALUES (?, ?, ?, ?)`,
        [
          order_id,
          item.product_id,
          item.quantity,
          products[0].price
        ]
      )

      // Reduce stock
      await connection.query(
        `UPDATE products
        SET stock = stock - ?
        WHERE product_id = ?`,
        [
          item.quantity,
          item.product_id
        ]
      )
    }

    // Clear cart after successful order
    await connection.query(
      `DELETE FROM cart_items
       WHERE user_id = ?`,
      [user_id]
    )

    await connection.commit()

    res.status(201).json({
      message: 'Order placed successfully',
      order_id: order_id
    })

  } catch (error) {

    await connection.rollback()

    console.log('ORDER ERROR:', error)

    res.status(500).json({
      message: 'Failed to place order'
    })

  } finally {
    connection.release()
  }
}

module.exports = {
  createOrder
}