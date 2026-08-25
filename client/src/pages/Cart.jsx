import React from 'react'
import './Cart.css'

function Cart({ cart, setCart }) {

  function removefromCart(id) {
    const updatedCart = cart.filter((product) => product.id !== id)
    setCart(updatedCart)
  }

  const total = cart.reduce((sum, product) => {
    return sum + product.price
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
                <div className="cart-item" key={product.id}>

                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <p>₹{product.price}</p>

                  <button onClick={() => removefromCart(product.id)}>
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