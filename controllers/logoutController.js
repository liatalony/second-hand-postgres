const pool = require('../config/DBConn');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refresh token in the DB?
    try {
      const checkUser = await pool.query('SELECT * FROM users WHERE refresh_token=$1 LIMIT 1', [refreshToken])

      if(!checkUser.rows.length > 0) {
        console.log('Logging out 1...');
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204); 
    }
    try {
        const removeToken = await pool.query('UPDATE users SET refresh_token=$1 WHERE user_id=$2', ['', checkUser.rows[0].user_id])
        console.log('Logging out...', removeToken.rows);
        res.clearCookie('jwt', {httpOnly: true});
        res.sendStatus(204);
      } catch (error) {
          res.json(error.message);
      }

    } catch (error) {
      res.json(error.message)
    }
}

module.exports = {handleLogout};