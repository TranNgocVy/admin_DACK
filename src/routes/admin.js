var express = require('express');
var router = express.Router();

const adminController = require("../app/controllers/adminController");

router.post('/book/store', adminController.store)
router.get('/book/input-new-book', adminController.inputbook)
router.get('/receipt-detail', adminController.receiptD)
router.get('/order-detail', adminController.OrderD)
router.get('/input-order', adminController.InputO)
router.get('/stock/stock-manager', adminController.stockM)
router.get('/order/order-manager', adminController.orderM)
router.get('/receipt/receipt-manager', adminController.receiptM)
router.get('/account/account-manager', adminController.accountM)
router.get('/forgetpass', adminController.forgetpass)
router.get('/', adminController.login)

module.exports = router