const express = require('express');
const router = express.Router();
const productFormController = require('../../controllers/productFormController');
const addProductController = require('../../controllers/addProductController');
const getProductController = require('../../controllers/getProductController');
const allProductsController = require('../../controllers/allProductsController')
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // up to 5mb  
    }
})

router.get('/all/:gender', allProductsController.getAllProducts);
router.get('/all/:gender/:subcategory', allProductsController.getAllProducts);
router.get('/add', productFormController.getProductForm);
router.post('/add', multer.array('item_image', 3), addProductController.addProduct);
router.get('/:id', getProductController.getProduct);
// router.post('/add', authController.handleLogin);

module.exports = router;

