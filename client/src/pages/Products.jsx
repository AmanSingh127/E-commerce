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
                  addtoCart={() => setCart([...cart, product])}
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