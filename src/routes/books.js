var express = require('express');
var router = express.Router();

const bookController = require('../app/controllers/bookController');

router.delete('/save/:id', bookController.saveDelete);
router.get('/book-manager', bookController.show);
router.post('/book-manager', bookController.addBook);
router.get('/input-new-book', bookController.inputbook);
router.get('/:id/edit', bookController.edit);
router.put('/save/:id', bookController.saveUpdate);
router.get('/book-manager-trash', bookController.showTrash)
router.patch('/save/:id/restore', bookController.restoreTrash);
router.delete('/save/:id/delete', bookController.deleteTrash);
module.exports = router;
