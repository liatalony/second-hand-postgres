const pool = require('../config/DBConn');

const getAdminAll= async (req, res) => {
    const status = req.params.status;
    console.log(status);
      try {
         const allProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, p.status, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true AND status=$1 ORDER BY date_inserted DESC', [status])

        if (allProducts.rows.length == 0) {
          return res.status(204)
        }
        res.status(200).send(allProducts.rows);
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getAdminAll};