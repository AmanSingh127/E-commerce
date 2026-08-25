import React,{useState} from 'react'
import ProductCard from '../components/ProductCard'
import './Products.css'
function Products({cart,setCart}) {

  const products=[
    {
      id:1,
      name:'RTX 4060',
      category:'GPU',
      price: 29999
    },
    {
      id:2,
      name:'Ryzen 5 7600',
      category:'CPU',
      price: 18999
    },
    {
      id:3,
      name:'16GB DDR5 RAM',
      category:'RAM',
      price: 5499
    }
    
  ]
  return (
    <>
    <div className='products'>
        <h1>Products</h1>
        
        <div className='product-list'>
          {products.map((product)=>(
            <ProductCard key={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            addtoCart={()=>setCart([...cart,product])}
            />
          ))}
        </div>
    </div>
    </>
  )
}

export default Products