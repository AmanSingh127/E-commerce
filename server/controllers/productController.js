const { pool } = require('../config/db');

// @desc    Get all products (optionally filtered by category name)
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let query = `
      SELECT p.product_id, p.name, p.brand, p.description, p.price, 
             p.stock, p.image_url, p.status, c.name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
    `;
    const params = [];

    if (category) {
      query += ' WHERE c.name = ?';
      params.push(category);
    }

    const [products] = await pool.query(query, params);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single product by ID (with its specifications)
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await pool.query(
      `SELECT p.product_id, p.name, p.brand, p.description, p.price, 
              p.stock, p.image_url, p.status, c.name AS category
       FROM products p
       JOIN categories c ON p.category_id = c.category_id
       WHERE p.product_id = ?`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const [specs] = await pool.query(
      `SELECT s.name AS specification, ps.value, s.unit
       FROM product_specifications ps
       JOIN specifications s ON ps.specification_id = s.specification_id
       WHERE ps.product_id = ?`,
      [id]
    );

    res.json({ ...products[0], specifications: specs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { category_id, brand, name, description, price, stock, image_url } = req.body;

    const [result] = await pool.query(
      `INSERT INTO products (category_id, brand, name, description, price, stock, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [category_id, brand, name, description, price, stock, image_url]
    );

    res.status(201).json({ product_id: result.insertId, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, name, description, price, stock, image_url } = req.body;

    const [result] = await pool.query(
      `UPDATE products 
       SET brand = ?, name = ?, description = ?, price = ?, stock = ?, image_url = ?
       WHERE product_id = ?`,
      [brand, name, description, price, stock, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM products WHERE product_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};