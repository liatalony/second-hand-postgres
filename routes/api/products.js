const express = require('express');
const router = express.Router();
const productFormController = require('../../controllers/productFormController');
const addProductController = require('../../controllers/addProductController');
const Multer = require('multer');
const path = require('path');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // up to 5mb  
    }
})

router.get('/add', productFormController.getProductForm);
router.post('/add', multer.array('item_image', 3), addProductController.addProduct);
// router.post('/add', authController.handleLogin);

module.exports = router;

