const pool = require('../config/DBConn');

const getSimilarProducts = async (req, res) => {
    const id = req.params.id;
    try {
        const allSimilarProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE ( img.is_main = true AND status=$1 AND is_reserved=false AND p.product_id!=$2 AND p.gender=(SELECT gender FROM product WHERE product_id=$2) )AND ( p.product_size_id=(select product_size_id from product WHERE product_id=$2) OR p.product_colour=(SELECT product_colour FROM product WHERE product_id=$2) OR p.product_category=(SELECT product_category FROM product WHERE product_id=$2)) GROUP BY p.product_id, p.product_headline, p.product_price, img.image_name LIMIT 5', ['active', id])
        
        if (allSimilarProducts.rows.length == 0) {
            return res.status(204).send('Something')
        }
        console.log(allSimilarProducts.rows);
        res.status(200).send(allSimilarProducts.rows);
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getSimilarProducts};