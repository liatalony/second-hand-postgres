const pool = require('../config/DBConn');


const handleNewUser = async (req, res) => {
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
      const addUser = await pool.query('INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_phone, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [ user_first_name, user_last_name, user_email, user_pass, user_phone, 1])
      res.status(201).json(addUser.rows)
    } catch (error) {
      res.json(error.message)
      console.error(error.message)
    }
  } catch (error) {
    res.json(error.message)
    console.error(error.message)
  }
}

module.exports = {handleNewUser};