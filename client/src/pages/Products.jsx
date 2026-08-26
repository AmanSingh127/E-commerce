//   const products=[
//     {
//       id:1,
//       name:'RTX 4060',
//       category:'GPU',
//       price: 29999
//     },
//     {
//       id:2,
//       name:'Ryzen 5 7600',
//       category:'CPU',
//       price: 18999
//     },
//     {
//       id:3,
//       name:'16GB DDR5 RAM',
//       category:'RAM',
//       price: 5499
//     }
    
//   ]


import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import './Products.css'

function Products({ cart, setCart }) {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <div className='products'>
        <h1>Products</h1>

        <div className='product-list'>
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              name={product.name}
              category={product.category}
              price={product.price}
              addtoCart={() => setCart([...cart, product])}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Products