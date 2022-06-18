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
const reservationIdController = require('../../controllers/reservationIdController');
const makeReservationController = require('../../controllers/makeReservarionController');
const updateReservation = require('../../controllers/updateReservations');
const getReservationsController = require('../../controllers/getReservationsController');
const reservationDetailsController = require('../../controllers/reservationDetailsController');
const approveReservationController = require('../../controllers/approveReservationController');
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
router.get('/saved/cart/get-id', reservationIdController.reservationId);
router.get('/add', productFormController.getProductForm);
router.get('/single-product/:id', getProductController.getProduct);
router.get('/dashboard/all-items/:status', adminAllProductsController.getAdminAll);
router.get('/update', updateReservation.updateReservation);
router.get('/reservations', getReservationsController.getReservations);
router.get('/reservations/:id', reservationDetailsController.reservationDetails);
router.get('/reservations/:id/:status', approveReservationController.approveReservation);
router.post('/add', multer.array('item_image', 3), addProductController.addProduct);
router.post('/saved/cart/reserve', makeReservationController.makeReservation);

module.exports = router;

