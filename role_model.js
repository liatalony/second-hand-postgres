const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '34.140.24.48',
  database: 'wrinkle-db',
  password: 'F;ytuJT3-$=l:68F',
  port: 5432,
});


const getRoles = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM role', (error, results) => {
        if (error) {
          reject(error)
          return
        }
        resolve(results.rows);
      })
    }) 
  }

  module.exports = {
    getRoles,
  }