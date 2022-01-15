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

router.get('/', adminController.main);
router.get('/revenue', adminController.showRevenue);
//forget password
router.get('/forgetpass', adminController.forgetpass);
router.post('/forgetpass', adminController.forgetPost);
router.get('/reset-password', adminController.resetPass);
router.post('/reset-password', adminController.resetPassPost);


module.exports = router;