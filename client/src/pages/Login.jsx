import React, { useState } from 'react'
import './Login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function login(e) {
    e.preventDefault()

    fetch('http://localhost:5000/logindata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="auth-page">

      <div className="auth-box">
        <h1>Login</h1>

        <form onSubmit={login}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

      </div>

    </div>
  )
}

export default Login