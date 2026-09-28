import React from 'react'
import './ProductCard.css'

function ProductCard({ name, category, price, image_url, addtoCart }) {
  return (
    <div className="product-card">

      <img
        src={`http://localhost:5000${image_url}`}
        alt={name}
        className="product-image"
      />

      <h3>{name}</h3>
      <p>{category}</p>
      <p>₹{price}</p>

      <button onClick={addtoCart}>
        Add to Cart
      </button>

    </div>
    
  )
}

export default ProductCard