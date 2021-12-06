const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')
const passport = require('../../config/auth/passport')

class adminController {

    //[POST]: /book/store
    async store(req, res, next) {
        try{
            if (!req.user){
                res.redirect('/login')
            }
            req.body.masach = await adminservice.genKeybook(req.body.hinhthuc);
            // insert book to db
            const book = await adminservice.getsachs().create({
                masach: req.body.masach,
                tensach: req.body.tensach,
                tacgia : req.body.tacgia,
                MOTA : req.body.MOTA,
                HINHANH : req.body.HINHANH,
                manxb : req.body.manxb,
                ngayXB : req.body.ngayXB,
                gia : req.body.gia,
                SL : 0,
            });
            //back to create book
            res.redirect('back')
        }catch (e) {
            next(e)
        }
    }

    //[GET]: /login
    async login(req, res, next) {
        try{
            if(!req.user){
                res.render('login', {
                    title: "Book Selling",
                    invalidlogin: req.query.invalidlogin
                });
            }else
                res.render('/account/account-manager')
        }catch (e) {
            next(e)
        }
    }
    //[GET]: /forget
    forgetpass(req, res, next) {
        try{
            res.render('forgetpass', {
                title: "Book Selling"
            });
        }catch (e) {
            next(e)
        }
    }
   
    //[GET]: /
    main(req, res, next) {
        try{
            if(req.user) {
                res.redirect('/accounts/account-manager')
            }else {
                res.redirect('/login')
            }
        }catch (e) {
            next(e)
        }
    }
    
    //[POST] : /login-handler
    loginHandler(req, res, next) {
        try{
            if(req.user) {
                res.redirect('/accounts/account-manager')
            }else
                res.redirect('/login')
        }catch (e) {
            next(e)
        }
    }

    //[GET] : /logout
    logout(req, res, next){
        try{
            req.logout()
            res.redirect('/')
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new adminController