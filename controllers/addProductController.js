const pool = require('../config/DBConn');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');
const { v4: uuidv4 } = require('uuid');
const { v4 } = require('uuid');

const uploadFile = (f) => {
  return new Promise((resolve, reject) => {
    const projectId = 'trim-sum-351809';
    const keyFileName = '../config/gcpStorageKey.json';
    const gc = new Storage({
        projectId,
        keyFileName
    })
    const bucket = gc.bucket('wrinkle');
    
    const { originalname, buffer } = f;
    var filename = originalname.toLowerCase().split(" ").join("-");

    filename = v4() + "-" + filename;

    console.log(filename);

    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        resolve(publicUrl);
      } catch (err) {
        console.log("Something went wrong");
        reject(err);
      }
    });

    blobStream.end(buffer);
  });
};


const addProduct = async (req, res, next) => {
  
  const urlList = [];
  console.log(req.files);
  const {item_name, item_desc, item_gender, item_category, item_sub_category, item_size, item_colour, item_condition, item_price} = req.body;
  if(!item_name || !item_desc || !item_gender || !item_category || !item_sub_category || !item_size || !item_colour || !item_condition || !item_price)  return res.status(500).send('All fields are required');
    if(!req.files) return res.status(500).send('No files uploaded');
    for (let i = 0; i < req.files.length; i++) {
      if (!req.files[i]) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      const publicUrl = await uploadFile(req.files[i]);
      urlList.push(publicUrl);
    }
  
    const item_size_txt = item_size.split(' ')[1];
    const item_size_id = item_size.split(' ')[0];

    console.log({'item size': item_size_txt, 'item id': item_size_id});
    let addItem;
    try {
      addItem = await pool.query('INSERT INTO product (user_id, product_headline, product_description, product_price, product_size, product_size_id, product_condition, product_colour, product_category, gender, product_type, is_reserved, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *', [1, item_name, item_desc, item_price, item_size_txt, item_size_id, item_condition, item_colour, item_sub_category, item_gender, item_category, false, 'pending'])
      if (!addItem.rows) {
       return res.status(500).send('something went wrong...');
      }
      const item_id = addItem.rows[0].product_id;
      addItemImages = await pool.query('INSERT INTO image (product_id, image_name, is_main) VALUES ($1, $2, $3), ($1, $4, $5), ($1, $6, $5)', [item_id, urlList[0], true, urlList[1], false, urlList[2]])
    } catch (error) {
      res.status(500).send(error.message);
    }

    return res.status(200).send({
      message: "Uploaded the files successfully",
      url: urlList,
      item: addItem.rows,
    });
}

module.exports = {addProduct};