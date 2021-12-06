var express = require('express');
var router = express.Router();

const accountController = require("../app/controllers/accountController");

router.get('/account-manager', accountController.show)
router.get('/add', accountController.add)
router.post('/add', accountController.adding)

module.exports = router