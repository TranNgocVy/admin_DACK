var express = require('express');
var router = express.Router();

const accountController = require("../app/controllers/accountController");

router.get('/account-manager', accountController.show)

module.exports = router