import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './Products.css'

function Products({ cart, setCart }) {

  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => console.log(error))
  }, [])

  const filteredProducts = products.filter((product) => {

    const searchText = search.toLowerCase()

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.brand.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)

    const matchesCategory =
      selectedCategory === '' ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  function addToCart(product) {

    const existingProduct = cart.find(
      (item) => item.product_id === product.product_id
    )

    if (existingProduct) {

      if (existingProduct.quantity >= product.stock) {
        alert("No more stock available")
        return
      }

      setCart(
        cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )

    } else {

      if (product.stock <= 0) {
        alert("Product is out of stock")
        return
      }

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ])

    }
  }

  return (
    <>
      <div className='products'>

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

            <button onClick={() => setSelectedCategory('PSU')}>
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

              <p>
                No products found for "{search}"
              </p>

            ) : (

              <div className='product-list'>

                {filteredProducts.map((product) => (

                  <ProductCard
                    key={product.product_id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    addtoCart={() => addToCart(product)}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  )
}

export default Products