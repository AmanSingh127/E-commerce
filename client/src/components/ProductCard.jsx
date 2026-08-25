import React from 'react'
import './ProductCard.css'
function ProductCard({name,category,price,addtoCart}) {
  return (
    <>
    <div className='product-card'>
        <h3>{name}</h3>
        <p>{category}</p>
        <p>{price}</p>

        <button onClick={addtoCart}>Add to Cart</button>
    </div>
    </>
  )
}

export default ProductCard