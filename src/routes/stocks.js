var express = require('express');
var router = express.Router();

const stockController = require('../app/controllers/stockController');

router.get('/stock-manager', stockController.showStock);

module.exports = router;
