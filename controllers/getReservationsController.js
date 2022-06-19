const pool = require('../config/DBConn');

const getReservations = async (req, res) => {
    console.log('reservations');
      try {
         const allReservations = await pool.query('select reservation_id, status, user_email from reservation group by reservation_id, status, user_email ORDER BY status DESC, reservation_id DESC');

        if (allReservations.rows.length == 0) {
          return res.status(204).send('Something')
        }
        res.status(200).send(allReservations.rows);
      } catch (error) {
        console.log(error);
        res.json(error)

      }
}

module.exports = {getReservations};