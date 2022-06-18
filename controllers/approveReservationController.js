const pool = require('../config/DBConn');

const approveReservation = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    try {
        const reservation = await pool.query('UPDATE reservation SET status=$1 WHERE reservation_id=$2', [status, id]);

       if (reservation.rows.length == 0) {
         return res.status(204).send('Something')
       }
       res.status(200).send(reservation.rows);
     } catch (error) { 
       console.log(error);
       res.json(error)

     }
}

module.exports = {approveReservation};