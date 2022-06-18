const pool = require('../config/DBConn');

const reservationDetails = async (req, res) => {
    const id = req.params.id;
    console.log('reservations');
      try {
         const reservation = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, img.image_name, r.reservation_id, r.user_email FROM product p JOIN image img ON img.product_id = p.product_id JOIN reservation r ON r.product_id = p.product_id WHERE img.is_main = true AND r.reservation_id=$1', [id]);

        if (reservation.rows.length == 0) {
          return res.status(204).send('Something')
        }
        res.status(200).send(reservation.rows);
      } catch (error) { z
        console.log(error);
        res.json(error)

      }
}

module.exports = {reservationDetails};