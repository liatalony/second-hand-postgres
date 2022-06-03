const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: '34.140.24.48',
  database: 'wrinkle-db',
  password: 'F;ytuJT3-$=l:68F',
  port: 5432,
});

module.exports = pool;