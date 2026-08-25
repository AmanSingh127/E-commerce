import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
function Navbar({cart}) {
  return (
    <>
    <nav>
        <div>
            <h2>BuildSphere</h2>
        </div>

        <div className='search'>
            <input type='text' placeholder='Search Products...'/>
        </div>

        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/builder">PC Builder</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
    </>
  )
}

export default Navbar