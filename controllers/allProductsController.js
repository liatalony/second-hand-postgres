const pool = require('../config/DBConn');

const getAllProducts = async (req, res) => {
      try {
        const allProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true',)
        if (allProducts.rows.length == 0) {
          return res.status(404).json({'message': 'Something went wrong. no such product'})
        }

        res.status(200).send(allProducts.rows);
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getAllProducts};