const express = require('express');
const router = express.Router();
const productFormController = require('../../controllers/productFormController');
const addProductController = require('../../controllers/addProductController');
const getProductController = require('../../controllers/getProductController');
const allProductsController = require('../../controllers/allProductsController');
const getFavouritesController = require('../../controllers/getFavouritesController');
const getNewProductsController = require('../../controllers/getNewProductsController');
const adminAllProductsController = require('../../controllers/adminAllProducts');
const getCartController = require('../../controllers/getCartController');
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // up to 5mb  
    }
})

router.get('/shop/', getNewProductsController.getNewProducts);
router.get('/shop/:gender', allProductsController.getAllProducts);
router.get('/shop/:gender/:subcategory', allProductsController.getAllProducts);
router.get('/saved/favourites', getFavouritesController.getAllFavourites);
router.get('/saved/cart', getCartController.getAllCart);
router.get('/add', productFormController.getProductForm);
router.get('/single-product/:id', getProductController.getProduct);
router.get('/dashboard/all-items/:status', adminAllProductsController.getAdminAll);
router.post('/add', multer.array('item_image', 3), addProductController.addProduct);

module.exports = router;

