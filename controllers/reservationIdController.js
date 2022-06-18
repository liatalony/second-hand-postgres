const pool = require('../config/DBConn');

const reservationId = async (req, res) => {

      try {
          const reservation_id = await pool.query('INSERT INTO reservation_id (res_id) VALUES(DEFAULT) RETURNING *')

        if (reservation_id.rows.length == 0) {
          return res.status(204).send('Something')
        }
        res.status(200).send(reservation_id.rows);
      } catch (error) {
        res.json(error)
        console.log('ERROR ERROR ERROR');
        console.log(error);
      }
}

module.exports = {reservationId};