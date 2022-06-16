const pool = require('../config/DBConn');

const getAllProducts = async (req, res) => {
  const gender = req.params.gender;
  const subcategory = req.params.subcategory;
      try {
        let allProducts;
        if (!subcategory) {
          allProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true and gender=(SELECT gender_id FROM gender where gender_name=$1) AND p.status=$2',[gender, 'active'])
        }else if(gender && subcategory){
          allProducts = await pool.query('SELECT p.product_id, p.product_headline, p.product_price, img.image_name FROM product p JOIN image img ON img.product_id = p.product_id WHERE img.is_main = true AND gender=(SELECT gender_id FROM gender where gender_name=$1) AND product_type=$2 AND p.status=$3',[gender, subcategory, 'active'])
        }
        if (allProducts.rows.length == 0) {
          return res.status(204)
        }

        res.status(200).send(allProducts.rows);
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getAllProducts};