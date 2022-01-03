const express = require('express');
const router = express.Router();
const upload = require('../config/uploadIMG/multer');
const bookController = require('../app/controllers/bookController');

router.delete('/save/:id', bookController.saveDelete);
router.get('/book-manager', bookController.show);
router.get('/book-manager/page/:page', bookController.show);
router.post('/book-manager', upload.single('file'), bookController.addBook);
router.get('/input-new-book', bookController.inputbook);
router.get('/:id/edit', bookController.edit);
router.put('/save/:id', upload.single('file'), bookController.saveUpdate);
router.get('/book-manager-trash', bookController.showTrash);
router.patch('/save/:id/restore', bookController.restoreTrash);
router.delete('/save/:id/delete', bookController.deleteTrash);
module.exports = router;