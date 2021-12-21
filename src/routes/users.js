var express = require('express');
var router = express.Router();
var upload = require('../config/uploadIMG/multer');

const userController = require('../app/controllers/userController');

router.get('/:username', userController.show);
router.put('/:username/edit', upload.single('file'), userController.edit);

module.exports = router;