const pool = require('../config/DBConn');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    try {
      const checkUser = await pool.query('SELECT * FROM users WHERE refresh_token=$1 LIMIT 1', [refreshToken])
        console.log('CHECK USER...', checkUser.rows);
      if(!checkUser.rows.length > 0) return res.sendStatus(403); //Forbidden

      jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, decoded) => {
              if (err || checkUser.rows[0].user_email !== decoded.user_email) return res.sendStatus(403);
              const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "user_email": decoded.user_email,
                        "user_role": decoded.user_role
                    }  
                },
                    process.env.ACCESS_TOKEN_SECRET,
                  {expiresIn: '30s'}
              );
              res.json({accessToken});
          }
          )

    } catch (error) {
      res.json(error.message)
    }
}

module.exports = {handleRefreshToken}