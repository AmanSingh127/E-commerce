import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import './Products.css'

function Products({ cart, setCart }) {

  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error))
  }, [])

  async function addToCart(product) {

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login before adding items to cart')
      return
    }

    try {

      const response = await fetch(
        'http://localhost:5000/api/cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            product_id: product.product_id,
            quantity: 1
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      alert('Product added to cart')

    } catch (error) {

      console.log(error)
      alert(error.message)

    }
  }

  const filteredProducts = selectedCategory === ''
    ? products
    : products.filter(
        (product) => product.category === selectedCategory
      )

  return (
    <div className="products">

      <h1>Products</h1>

      <div className="products-layout">

        <aside className="category-sidebar">

          <h3>Categories</h3>

          <button onClick={() => setSelectedCategory('')}>
            All Products
          </button>

          <button onClick={() => setSelectedCategory('CPU')}>
            CPU
          </button>

          <button onClick={() => setSelectedCategory('GPU')}>
            GPU
          </button>

          <button onClick={() => setSelectedCategory('Motherboard')}>
            Motherboard
          </button>

          <button onClick={() => setSelectedCategory('RAM')}>
            RAM
          </button>

          <button onClick={() => setSelectedCategory('Storage')}>
            Storage
          </button>

          <button onClick={() => setSelectedCategory('Power Supply')}>
            PSU
          </button>

          <button onClick={() => setSelectedCategory('Cabinet')}>
            Cabinet
          </button>

          <button onClick={() => setSelectedCategory('CPU Cooler')}>
            CPU Cooler
          </button>

        </aside>

        <div className="products-content">

          {filteredProducts.length === 0 ? (

            <p>No products found.</p>

          ) : (

            <div className="product-list">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.product_id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  image_url={product.image_url}
                  addtoCart={() => addToCart(product)}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Products