const pool = require('../config/DBConn');

const getNewProducts = async (req, res) => {
      try {
        console.log('working..');
         const allNewProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true ORDER BY p.date_inserted DESC LIMIT 10')

        if (allNewProducts.rows.length == 0) {
          return res.status(204).send('Something')
        }
        res.status(200).send(allNewProducts.rows);
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getNewProducts};