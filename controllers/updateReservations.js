const pool = require('../config/DBConn');

const updateReservation = async (req, res) => {

      try {
          const reservations = await pool.query("UPDATE reservation SET status='cancelled' WHERE reserved_until < CURRENT_TIMESTAMP returning *");
          const products = await pool.query('UPDATE product SET is_reserved=false WHERE reserved_until < CURRENT_TIMESTAMP AND is_reserved=true returning *');
        res.status(200).send(reservations.rows);
      } catch (error) {
        res.json(error)
        console.log('ERROR ERROR ERROR');
        console.log(error);
      }
}

module.exports = {updateReservation};