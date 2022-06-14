const pool = require('../config/DBConn');

const getProduct = async (req, res) => {
    const productId = req.params.id;
      try {
        const getProduct = await pool.query('SELECT * FROM product WHERE product_id=$1 LIMIT 1', [productId])
        if (getProduct.rows.length == 0) {
          return res.status(404).json({'message': 'Something went wrong. no such product'})
        }
        const getImages = await pool.query('SELECT * FROM image WHERE product_id = $1', [productId])
        
        if (getImages.rows == 0) {
            return res.status(404).json({'message': 'Cant get images'})
        }
        console.log(getImages.rows);
        console.log(getProduct.rows);

        res.status(200).send({
            product: getProduct.rows, 
            images: getImages.rows,
        })
      } catch (error) {
        res.json(error)
      }
}

module.exports = {getProduct};