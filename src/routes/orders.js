var express = require('express');
var router = express.Router();

const orderController = require('../app/controllers/orderController');

router.get('/order-detail/:id', orderController.showDetail);
router.get('/input-order', orderController.input);
router.post('/input-order', orderController.submit);

router.get('/order-manager', orderController.show);
router.get('/api/getBookNXB', orderController.getBookNXB);
router.get('/api/getBookNameNXB', orderController.getBookNameNXB);

module.exports = router;
