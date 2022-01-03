var express = require('express');
var router = express.Router();

const receiptController = require('../app/controllers/receiptController');

router.get('/receipt-detail/:id', receiptController.showDetail);
router.get('/receipt-manager', receiptController.show);
router.get('/receipt-manager/page/:page', receiptController.show);

module.exports = router;