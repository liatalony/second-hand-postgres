require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const app = express()
const cors = require('cors');
const pool = require('./config/DBConn')
const port = 3001

const whitelist = ['127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) =>{
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json())


app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users')
    res.json(allUsers.rows)
    console.log(allUsers.rows)
  } catch (error) {
    res.json(error.message)
    console.error(error.message)
  }
})

app.post('/users/register', async (req, res) => {
  const { user_first_name, user_last_name, user_email , user_con_pass, user_pass, user_phone } = req.body;
  if (!user_first_name || !user_last_name || !user_email || !user_con_pass || !user_pass || !user_phone) return res.status(400).json({ 'message': 'All fields are required.' });

  try {
    const checkUser = await pool.query('SELECT user_id FROM users WHERE user_email=$1', [user_email])
    // res.status(200).json(checkUser.rows.length > 0)
    if (checkUser.rows.length > 0) {
      res.status(409).json({'message': 'A user with this email already exists'})
      console.log(checkUser.rows)
      return
    }
    try {
      const addUser = await pool.query('INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_phone) VALUES ($1, $2, $3, $4, $5) RETURNING *', [ user_first_name, user_last_name, user_email, user_pass, user_phone])
      res.status(201).json(addUser.rows)
    } catch (error) {
      res.json(error.message)
      console.error(error.message)
    }
  } catch (error) {
    res.json(error.message)
    console.error(error.message)
  }
})

app.post('/users/login', async (req, res) => {
  const {user_email, user_pass} = req.body;
  if (!user_email || !user_pass) return res.status(400).json({ 'message': 'All fields are required.' });
  try {
    const checkUser = await pool.query('SELECT * FROM users WHERE user_email=$1 LIMIT 1', [user_email])
    if (checkUser.rows.length > 0) {
      console.log(checkUser.rows)
      // res.status(200).json(checkUser.rows[0].user_password)
      if (checkUser.rows[0].user_password == user_pass) {
        res.status(200).json({'message': 'This user exists, passwords match'})
      }else{
        res.status(409).json({'message': 'This user exists, passwords dont match'})
      }
      return
    }else{      
      res.status(409).json({'message': 'No such user'})
    }
  } catch (error) {
    res.json(error.message)
  }
})

app.get('/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM product')
    res.status(200).json(allProducts.rows)
  } catch (error) {
    res.json(error)
  }
})
app.get('/products/:id', async (req, res) => {
  const productId = '3'
  try {
    const allProducts = await pool.query('SELECT * FROM product WHERE product_id=$1 LIMIT 1', [productId])
    if (allProducts.rows.length == 0) {
      res.status(404).json({'message': 'Something went wrong. no such product'})
    }
    res.status(200).json(allProducts.rows)
  } catch (error) {
    res.json(error)
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})