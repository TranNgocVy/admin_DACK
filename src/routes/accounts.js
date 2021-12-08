const express = require('express');
const router = express.Router();
const multer = require('multer');
const accountController = require('../app/controllers/accountController');
const upload = multer({storage: multer.memoryStorage()})

router.get('/account-manager', accountController.show);
router.get('/add', accountController.add);
router.post('/add',upload.single('file'), accountController.adding);

module.exports = router;
