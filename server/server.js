const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { connectDB } = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.post('/signupdata', (req, res) => {
  const { name, email, password } = req.body

  console.log('Name:', name)
  console.log('Email:', email)
  console.log('Password:', password)

  res.send('Signup data received')
})

app.post('/logindata', (req, res) => {
  const { email, password } = req.body

  console.log('Email:', email)
  console.log('Password:', password)

  res.send('Login data received')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})