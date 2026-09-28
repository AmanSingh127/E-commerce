import React, { useEffect, useState } from 'react'
import './AdminOrder.css'

function AdminOrder() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch('http://localhost:5000/api/admin/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })

  }, [])

  async function updateStatus(id, status) {

    try {

      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: status
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setOrders(
        orders.map((order) =>
          order.order_id === id
            ? { ...order, status: status }
            : order
        )
      )

    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  if (loading) {
    return <p>Loading orders...</p>
  }

  return (
    <div className="admin-orders">

      <h1>Orders</h1>

      {orders.length === 0 ? (

        <p>No orders found.</p>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div className="order-card" key={order.order_id}>

              <h2>Order #{order.order_id}</h2>

              <p>
                <strong>Customer:</strong> {order.name}
              </p>

              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <p>
                <strong>Address:</strong>{' '}
                {order.street}, {order.city}, {order.state} - {order.pincode}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.total_amount}
              </p>

              <div className="order-status">

                <strong>Status:</strong>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.order_id, e.target.value)
                  }
                  className={`status-select ${order.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

              </div>

              <p>
                <strong>Payment:</strong> {order.payment_method}
              </p>

              <p>
                <strong>Order Date:</strong>{' '}
                {new Date(order.created_at).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default AdminOrder