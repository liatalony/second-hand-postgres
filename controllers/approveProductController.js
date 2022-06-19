const pool = require('../config/DBConn');

const approveProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const approved = await pool.query('UPDATE product SET status=$1 WHERE product_id=$2', ['active', id]);

       if (approved.rows.length == 0) {
         return res.status(204).send('Something')
       }
       res.status(200).send(approved.rows);
     } catch (error) { 
       console.log(error);
       res.json(error)

     }
}

module.exports = {approveProduct};