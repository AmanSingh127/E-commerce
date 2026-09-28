const { pool } = require('../config/db')

const getCart = async (req, res) => {
  try {

    const user_id = req.user.user_id

    const [rows] = await pool.query(
      `SELECT
        ci.product_id,
        ci.quantity,
        p.name,
        c.name AS category,
        p.price,
        p.stock,
        p.image_url
      FROM cart_items ci
      JOIN products p
        ON ci.product_id = p.product_id
      JOIN categories c
        ON p.category_id = c.category_id
      WHERE ci.user_id = ?`,
      [user_id]
    )

    res.json(rows)

  } catch (error) {

    console.log('GET CART ERROR:', error)

    res.status(500).json({
      message: 'Failed to get cart'
    })

  }
}


const addToCart = async (req, res) => {
  try {

    const user_id = req.user.user_id
    const { product_id, quantity } = req.body

    if (!product_id) {
      return res.status(400).json({
        message: 'Product ID is required'
      })
    }

    const [products] = await pool.query(
      `SELECT product_id, stock
       FROM products
       WHERE product_id = ?`,
      [product_id]
    )

    if (products.length === 0) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    const [carts] = await pool.query(
      `SELECT cart_id
       FROM cart
       WHERE user_id = ?`,
      [user_id]
    )

    let cart_id

    if (carts.length === 0) {

      const [cartResult] = await pool.query(
        `INSERT INTO cart (user_id)
         VALUES (?)`,
        [user_id]
      )

      cart_id = cartResult.insertId

    } else {

      cart_id = carts[0].cart_id

    }

    const [existing] = await pool.query(
      `SELECT quantity
       FROM cart_items
       WHERE cart_id = ? AND product_id = ?`,
      [cart_id, product_id]
    )

    const newQuantity =
      existing.length > 0
        ? existing[0].quantity + (quantity || 1)
        : (quantity || 1)

    if (newQuantity > products[0].stock) {
      return res.status(400).json({
        message: 'Not enough stock available'
      })
    }

    if (existing.length > 0) {

      await pool.query(
        `UPDATE cart_items
         SET quantity = ?
         WHERE cart_id = ? AND product_id = ?`,
        [newQuantity, cart_id, product_id]
      )

    } else {

      await pool.query(
        `INSERT INTO cart_items
         (cart_id, user_id, product_id, quantity)
         VALUES (?, ?, ?, ?)`,
        [cart_id, user_id, product_id, quantity || 1]
      )

    }

    res.json({
      message: 'Product added to cart'
    })

  } catch (error) {

    console.log('ADD CART ERROR:', error)

    res.status(500).json({
      message: 'Failed to add product to cart'
    })

  }
}


const updateCartItem = async (req, res) => {
  try {

    const user_id = req.user.user_id
    const product_id = req.params.product_id
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({
        message: 'Quantity must be at least 1'
      })
    }

    const [products] = await pool.query(
      `SELECT stock
       FROM products
       WHERE product_id = ?`,
      [product_id]
    )

    if (products.length === 0) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    if (quantity > products[0].stock) {
      return res.status(400).json({
        message: 'Not enough stock available'
      })
    }

    await pool.query(
      `UPDATE cart_items
       SET quantity = ?
       WHERE user_id = ? AND product_id = ?`,
      [quantity, user_id, product_id]
    )

    res.json({
      message: 'Cart updated'
    })

  } catch (error) {

    console.log('UPDATE CART ERROR:', error)

    res.status(500).json({
      message: 'Failed to update cart'
    })

  }
}


const removeFromCart = async (req, res) => {
  try {

    const user_id = req.user.user_id
    const product_id = req.params.product_id

    await pool.query(
      `DELETE FROM cart_items
       WHERE user_id = ? AND product_id = ?`,
      [user_id, product_id]
    )

    res.json({
      message: 'Product removed from cart'
    })

  } catch (error) {

    console.log('REMOVE CART ERROR:', error)

    res.status(500).json({
      message: 'Failed to remove product'
    })

  }
}


module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
}