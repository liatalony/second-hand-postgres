const pool = require('../config/DBConn');
const bcrypt = require('bcrypt');


const handleAdmin = async (req, res) => {
    try {
    const user_pass = 'admin';
      const hashed = await bcrypt.hash(user_pass, 10);
      const addUser = await pool.query('INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_phone, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [ 'Staff', 'Account', 'admin@admin.com', hashed, '12345678', 2])
      res.status(201).json(addUser.rows)
    } catch (error) {
      res.json(error.message)
      console.error(error.message)
    }
}

module.exports = {handleAdmin};