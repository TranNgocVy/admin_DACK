var express = require('express');
var router = express.Router();

const orderController = require('../app/controllers/orderController');

router.get('/order-detail', orderController.showDetail);
router.get('/input-order', orderController.input);
router.get('/order-manager', orderController.show);

module.exports = router;
