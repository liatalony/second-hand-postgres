const pool = require('../config/DBConn');
const {Storage} = require('@google-cloud/storage');
const path = require('path');

// const addProduct = async (req, res) => {
//     // const {item_name, item_desc, item_categoty, item_sub_category, item_sub_sub_category, item_size, item_size_id, item_colour, item_condition} = req.body;
//     // if(!req.files) return res.status(500).send('No files uploaded');
//     try {
//         // const addProducts = await pool.query('INSERT INTO product (product_headline, product_desctoption, product_size, product_size_id, product_quality, product_colour, product_category, product_gender, product_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ', [item_name, item_desc, item_size, item_size_id, item_condition, item_colour, item_sub_category, item_categoty, item_sub_sub_category])
//         const addProducts = await pool.query('SELECT * FROM roles');
//         res.status(200).json(addProducts.rows);
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

const addProduct = async (req, res, next) => {
    if(!req.files) return res.status(500).send('No files uploaded');
    const uploaded = req.files[0];
    console.log(uploaded);
    const projectId = 'trim-sum-351809';
    const keyFileName = '../config/gcpStorageKey.json';
    const gc = new Storage({
        projectId,
        keyFileName
    })
    const bucket = gc.bucket('wrinkle')
    console.log(bucket);
    try {
        const blob = bucket.file(uploaded.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false
        });
          blobStream.on('error', err => {
            console.log('ERROR ERROR ERROR');
            next(err);
          });
          
          blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            res.status(200).send(publicUrl);
          });
        
          blobStream.end(uploaded.buffer);
    } catch (error) {
        console.log('ERROR ERROR ERROR');
        res.send(error)
    }
}

module.exports = {addProduct}

    // try {
    //   const allProducts = await pool.query('INSERT INTO product () VALUES () ', [productId])
    //   if (allProducts.rows.length == 0) {
    //     res.status(404).json({'message': 'Something went wrong. no such product'})
    //   }
    //   res.status(200).json(allProducts.rows)
    // } catch (error) {
    //   res.json(error)
    // }
//   }


