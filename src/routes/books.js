var express = require('express');
var router = express.Router();

const bookController = require("../app/controllers/bookController");

router.get('/book-manager', bookController.show)
router.post('/book-manager',bookController.addBook)
router.get('/input-new-book', bookController.inputbook)

module.exports = router