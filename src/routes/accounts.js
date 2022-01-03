const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/accountController');
const upload = require('../config/uploadIMG/multer');

router.get('/account-manager', accountController.show);
router.get('/account-manager/page/:page', accountController.show);
router.get('/customer/:id', accountController.detailCustomer);
router.get('/add', accountController.add);
router.post('/add', upload.single('file'), accountController.adding);

module.exports = router;