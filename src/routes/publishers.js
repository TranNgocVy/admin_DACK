const express = require('express');
const router = express.Router();

const publisherController = require('../app/controllers/publisherController');

router.get('/publisher-manager', publisherController.show);
router.post('/add', publisherController.adding);
router.put('/:nxb/update', publisherController.update);
module.exports = router;
