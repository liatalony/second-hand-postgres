const pool = require('../config/DBConn');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const {user_email, user_pass} = req.body;
    if (!user_email || !user_pass) return res.status(400).json({ 'message': 'All fields are required.' });
    try {
      const checkUser = await pool.query('SELECT * FROM users WHERE user_email=$1 LIMIT 1', [user_email])
      if (checkUser.rows.length > 0) {
        // console.log(checkUser.rows)
        // res.status(200).json(checkUser.rows[0].user_password)
        const match =  await bcrypt.compare(user_pass, checkUser.rows[0].user_password);
        if (match) {

          const role = checkUser.rows[0].user_role;
          const id = checkUser.rows[0].user_id;
  
          const accessToken = jwt.sign(
            {
              UserInfo: {
                user_email: checkUser.rows[0].user_email,
                user_role: role
              }
            },
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: '10s'});

  
          const refreshToken = jwt.sign(
            {
              UserInfo: {
                user_email: checkUser.rows[0].user_email,
                user_role: role
              }
            },
          process.env.REFRESH_TOKEN_SECRET,
          {expiresIn: '20s'});

          try {
            const addToken = await pool.query('UPDATE users SET refresh_token=$1 WHERE user_id=$2 RETURNING *', [refreshToken, checkUser.rows[0].user_id])
            console.log(refreshToken);
            console.log(addToken.rows);
              res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
              res.json({accessToken, role, user_email, id});

          } catch (error) {
              res.json(error.message);
          }
  
        //   res.status(200).json({'message': 'This user exists, passwords match', 'status':200})
        }else{
          res.status(403).json({'message': 'This user exists, passwords dont match'})
        }
        return
      }else{      
        res.status(403).json({'message': 'No such user'})
      }
    } catch (error) {
      res.json(error.message)
    }
}

module.exports = {handleLogin};