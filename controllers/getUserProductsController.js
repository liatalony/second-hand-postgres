const pool = require('../config/DBConn');

const getUserProducts = async (req, res) => {
  const id = req.params.id;
      try {
        let allProducts;
          allProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, p.status, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true AND p.user_id=$1',[id])
        if (allProducts.rows.length == 0) {
          return res.status(204)
        }

        res.status(200).send(allProducts.rows);
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getUserProducts};