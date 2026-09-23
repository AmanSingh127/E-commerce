import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-content">

        <h2>BuildSphere</h2>

        <p>
          Gaming Hardware • PC Builder • E-Commerce
        </p>

        <div className="footer-links">

          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Link to="/builder">PC Builder</Link>

          <Link to="/cart">Cart</Link>

        </div>

      </div>

    </footer>
  )
}

export default Footer