const express = require('express');
const router = express.Router();
const upload = require('../config/uploadIMG/multer')
const apiController = require('../app/controllers/apiController');

router.get('/orders/getBookNameNXB', apiController.getBookNameNXB);
router.get('/orders/getBookNXB', apiController.getBookNXB);
router.post('/orders/submit', apiController.submit);
router.delete('/orders/remove/:index', apiController.removeItem);
router.put('/orders/update/:index', apiController.updateItem);
router.put('/accounts/lockOrUnlockAccount',apiController.lockCustomer)

module.exports = router;
