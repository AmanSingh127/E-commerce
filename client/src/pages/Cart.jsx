import React from 'react'
import './Cart.css'

function Cart({ cart, setCart }) {

  function removefromCart(id) {
    const updatedCart = cart.filter((product) => product.product_id !== id)
    setCart(updatedCart)
  }


     function increaseQuantity(id) {

    const updatedCart = cart.map((product) => {

      if (product.product_id === id) {

        if (product.quantity >= product.stock) {
          alert("No more stock available")
          return product
        }

        return {
          ...product,
          quantity: product.quantity + 1
        }
      }
      
      return product
    })

    setCart(updatedCart)
  }


    function decreaseQuantity(id) {

    const updatedCart = cart.map((product) => {

      if (product.product_id === id) {

        if (product.quantity === 1) {
          return product
        }

        return {
          ...product,
          quantity: product.quantity - 1
        }
      }

      return product
    })

    setCart(updatedCart)
  }



  // const total = cart.reduce((sum, product) => {
  //   return sum + Number(product.price)
  // }, 0)

  const total = cart.reduce((sum, product) => {
  return sum + Number(product.price) * product.quantity
}, 0)

  return (
    <>
      <div className="cart-page">

        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">

              {cart.map((product) => (
                <div className="cart-item" key={product.product_id}>

                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <p>₹{product.price}</p>

                  <div className="quantity-controls">

                    <button onClick={() => decreaseQuantity(product.product_id)}>
                      -
                    </button>

                    <span>{product.quantity}</span>

                    <button onClick={() => increaseQuantity(product.product_id)}>
                      +
                    </button>

                  </div>

                  <button onClick={() => removefromCart(product.product_id)}>
                    Remove
                  </button>
                   
                </div>
              ))}

            </div>

            <div className="cart-total">
              <h2>Total: ₹{total}</h2>
              <button>Checkout</button>
            </div>
          </>
        )}

      </div>
    </>
  )
}

export default Cart