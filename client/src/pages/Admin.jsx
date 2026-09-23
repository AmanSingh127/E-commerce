import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

function Admin() {

  const [stats, setStats] = useState({
  totalProducts: 0,
  totalUsers: 0,
  totalOrders: 0,
  lowStock: 0
})

useEffect(() => {

  fetch('http://localhost:5000/api/admin/stats')
    .then((response) => response.json())
    .then((data) => {
      setStats(data)
    })
    .catch((error) => {
      console.log(error)
    })

}, [])

  return (
   <>
   <div className="admin-layout">

  <aside className="admin-sidebar">

    <h2>BuildSphere</h2>

   <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/users">Users</Link>
    </nav>

  </aside>

<main className="admin-content">

  <h1>Dashboard</h1>

  <div className="admin-cards">

    <div className="admin-card">
      <h3>Total Products</h3>
      <p>{stats.totalProducts}</p>
    </div>

    <div className="admin-card">
      <h3>Total Users</h3>
      <p>{stats.totalUsers}</p>
    </div>

    <div className="admin-card">
      <h3>Total Orders</h3>
      <p>{stats.totalOrders}</p>
    </div>

    <div className="admin-card">
      <h3>Low Stock</h3>
      <p>{stats.lowStock}</p>
    </div>

  </div>

</main>
</div>
   </>
  )
}

export default Admin