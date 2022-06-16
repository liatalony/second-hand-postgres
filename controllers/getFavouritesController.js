const pool = require('../config/DBConn');

const getAllFavourites = async (req, res) => {
      try {
        console.log('working..');
         const allProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, p.status, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true')

        if (allProducts.rows.length == 0) {
          return res.status(204).send('Something')
        }
        res.status(200).send(allProducts.rows);
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getAllFavourites};