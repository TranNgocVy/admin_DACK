var express = require('express');
var router = express.Router();

const adminController = require("../app/controllers/adminController");

router.get('/forgetpass', adminController.forgetpass)
router.get('/', adminController.login)

module.exports = router