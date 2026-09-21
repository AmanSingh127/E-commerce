const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bcrypt=require('bcrypt')
const { connectDB,pool } = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const jwt=require('jsonwebtoken')
const authMiddleware = require('./middleware/authMiddleware')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)


//sign up

app.post('/signupdata',async (req, res) => {

 try {  
  const { name, email, password } = req.body

  const passwordHash=await bcrypt.hash(password,10);
 
  //console.log("HASH:", passwordHash);
 
  const [result]=await pool.execute(
    `INSERT INTO users (name,email,password_hash)
    VALUES (?,?,?)`,
    [name,email,passwordHash]
  );
  //console.log("INSERT RESULT:", result);
  res.status(201).json({
    message:"Account created Successfully"
  });

}catch(err){
  if(err.code==='ER_DUP_ENTRY'){
    return res.status(409).json({
      message:"Email already registered"
    });
  }
  res.status(500).json({
    message:"Something went wrong"
  })
}
});


//login 
app.post('/logindata', async (req, res) => {

    const { email, password } = req.body

    const [rows] = await pool.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    )

    if (rows.length === 0) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isMatch = await bcrypt.compare(
        password,
        rows[0].password_hash
    )

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { user_id: rows[0].user_id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.json({
        message: "Login successful",
        token: token
    })
})


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})