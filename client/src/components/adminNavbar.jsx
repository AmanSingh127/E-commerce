import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'

function AdminNavbar() {

  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav>

      <div>
        <h2>BuildSphere Admin</h2>
      </div>

      <div className="nav-links">

        <Link to="/admin">Dashboard</Link>
    <Link to="/add">Add Products</Link>
        <Link to="/admin/products">
          Products
        </Link>

        <Link to="/admin/orders">
          Orders
        </Link>

        <Link to="/admin/users">
          Users
        </Link>

        <Link to="/">
          View Store
        </Link>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </nav>
  )
}

export default AdminNavbar