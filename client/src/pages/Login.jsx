import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className="auth-page">

      <div className="auth-box">
        <h1>Login</h1>

        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>
        </form>

      </div>

    </div>
  )
}

export default Login