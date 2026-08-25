import React from 'react'
import './Signup.css'

function Register() {
  return (
    <div className="auth-page">

      <div className="auth-box">
        <h1>Create Account</h1>

        <form>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />

          <button type="submit">Sign Up</button>
        </form>

      </div>

    </div>
  )
}

export default Register