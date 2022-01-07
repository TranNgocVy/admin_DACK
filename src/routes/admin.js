var express = require('express');
var router = express.Router();

const adminController = require('../app/controllers/adminController');

const passport = require('../config/auth/passport');
// authenticate user name
router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login?invalidlogin=true',
    }),
    adminController.loginHandler,
);
router.get('/logout', adminController.logout);
router.get('/login', adminController.login);
router.get('/forgetpass', adminController.forgetpass);
router.get('/', adminController.main);
router.get('/revenue', adminController.showRevenue);

module.exports = router;