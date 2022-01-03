var express = require('express');
var router = express.Router();

const orderController = require('../app/controllers/orderController');

router.get('/order-detail/:id', orderController.showDetail);
router.get('/input-order', orderController.input);
router.post('/input-order', orderController.submit);

router.get('/order-manager', orderController.show);
router.get('/order-manager/page/:page', orderController.show);

module.exports = router;