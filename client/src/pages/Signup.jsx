import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function signup(e) {
    e.preventDefault()

    fetch('http://localhost:5000/signupdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data)
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="auth-page">

      <div className="auth-box">
        <h1>Create Account</h1>

        <form onSubmit={signup}>

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>

        </form>

      </div>

    </div>
  )
}

export default Signup