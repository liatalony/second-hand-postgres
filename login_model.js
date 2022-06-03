const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '34.140.24.48',
  database: 'wrinkle-db',
  password: 'F;ytuJT3-$=l:68F',
  port: 5432,
});


const getUser = (email) => {
    const user_email = email;
    return new Promise(function(resolve, reject) {
      pool.query('SELECT user_id, user_email, user_password FROM users WHERE user_email=$1', [user_email], (error, results) => {
        if (error) {
          reject(error)
          return
        }
        resolve(results.rows);
      })
    }) 
  }

  module.exports = {
    getUser,
  }