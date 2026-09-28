import React, { useEffect } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

function Cart({ cart, setCart }) {

  const navigate = useNavigate()

  useEffect(() => {

    async function getCart() {

      const token = localStorage.getItem('token')

      if (!token) {
        setCart([])
        return
      }

      try {

        const response = await fetch(
          'http://localhost:5000/api/cart',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message)
        }

        setCart(data)

      } catch (error) {

        console.log(error)
        alert(error.message)

      }
    }

    getCart()

  }, [setCart])


  async function removefromCart(id) {

    const token = localStorage.getItem('token')

    try {

      const response = await fetch(
        `http://localhost:5000/api/cart/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setCart(
        cart.filter((product) => product.product_id !== id)
      )

    } catch (error) {

      console.log(error)
      alert(error.message)

    }
  }


  async function increaseQuantity(id) {

    const product = cart.find(
      (product) => product.product_id === id
    )

    if (!product) return

    if (product.quantity >= product.stock) {
      alert('No more stock available')
      return
    }

    await changeQuantity(
      id,
      product.quantity + 1
    )
  }


  async function decreaseQuantity(id) {

    const product = cart.find(
      (product) => product.product_id === id
    )

    if (!product) return

    if (product.quantity === 1) {
      return
    }

    await changeQuantity(
      id,
      product.quantity - 1
    )
  }


  async function changeQuantity(id, quantity) {

    const token = localStorage.getItem('token')

    try {

      const response = await fetch(
        `http://localhost:5000/api/cart/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: quantity
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setCart(
        cart.map((product) =>
          product.product_id === id
            ? { ...product, quantity: quantity }
            : product
        )
      )

    } catch (error) {

      console.log(error)
      alert(error.message)

    }
  }


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

                <div
                  className="cart-item"
                  key={product.product_id}
                >

                  <h3>{product.name}</h3>

                  <p>{product.category}</p>

                  <p>₹{product.price}</p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(product.product_id)
                      }
                    >
                      -
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(product.product_id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() =>
                      removefromCart(product.product_id)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            <div className="cart-total">

              <h2>Total: ₹{total}</h2>

              <button onClick={() => navigate('/order')}>
                Checkout
              </button>

            </div>

          </>

        )}

      </div>
    </>
  )
}

export default Cart