var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/userController');

router.get('/:username', userController.show);
router.put('/:username/edit', userController.edit);

module.exports = router;
