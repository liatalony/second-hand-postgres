const pool = require('../config/DBConn');

const getAllCart = async (req, res) => {
      try {
        console.log('working..');
         const allProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true AND p.status=$1', ['active'])

        if (allProducts.rows.length == 0) {
          return res.status(204).send('Something')
        }
        res.status(200).send(allProducts.rows);
      } catch (error) {
        console.log(error);
        res.json(error)
      }
}

module.exports = {getAllCart};