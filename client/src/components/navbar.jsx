
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ cart }) {
  
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <nav>

        <div>
          <h2>BuildSphere</h2>
        </div>

        <div className='search'>
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/products?search=${encodeURIComponent(search)}`)
            }
          }}
        />
        </div>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Link to="/builder">PC Builder</Link>

          <Link to="/cart">
            Cart ({cart.length})
          </Link>

          {localStorage.getItem('token') ? (
            <button onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}

        </div>

      </nav>
    </>
  )
}

export default Navbar

function logout() {
    localStorage.removeItem('token')
    navigate('/login')
}



{localStorage.getItem('token') ? (
    <button onClick={logout}>Logout</button>
) : (
    <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
    </>
)}

