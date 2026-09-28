import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Order.css'

function Order({ cart, setCart }) {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')

  const total = cart.reduce((sum, product) => {
    return sum + Number(product.price) * product.quantity
  }, 0)

  async function placeOrder(e) {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login before placing an order')
      navigate('/login')
      return
    }

    try {

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({
          name,
          phone,
          street,
          city,
          state,
          pincode,
          country: 'India',

          items: cart.map((product) => ({
            product_id: product.product_id,
            quantity: product.quantity
          }))
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order')
      }

      alert(`Order placed successfully! Order ID: ${data.order_id}`)

      setCart([])

      navigate('/')

    } catch (error) {

      console.log(error)
      alert(error.message)

    }
  }

  return (
    <div className="order-page">

      <h1>Place Your Order</h1>

      <form onSubmit={placeOrder}>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />

        <label>Street</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Enter your street address"
          required
        />

        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          required
        />

        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter your state"
          required
        />

        <label>Pincode</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter your pincode"
          required
        />

        <h2>Total: ₹{total}</h2>

        <button type="submit">
          Place Order
        </button>

      </form>

    </div>
  )
}

export default Order