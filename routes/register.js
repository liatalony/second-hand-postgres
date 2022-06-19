
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const adminController = require('../controllers/adminController');


router.post('/', registerController.handleNewUser);
router.get('/admin', adminController.handleAdmin);


module.exports = router;