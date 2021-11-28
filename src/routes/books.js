var express = require('express');
var router = express.Router();

const bookController = require("../app/controllers/bookController");

router.delete('/save/:id', bookController.saveDelete)
router.get('/TL', bookController.setCatagories)
router.get('/book-manager', bookController.show)
router.post('/book-manager',bookController.addBook)
router.get('/input-new-book', bookController.inputbook)
router.get('/:id/edit', bookController.edit)
router.put('/save/:id', bookController.saveUpdate)


module.exports = router