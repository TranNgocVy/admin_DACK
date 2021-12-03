const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class accountController {
    //[GET]: /account-manager
    show(req, res, next) {
        try {
            if(req.user){
                res.render('account/account-manager', {
                    title: "Book Selling"
                });
            }else {
                res.redirect("/")
            }
        }catch (e) {
            next(e)
        }

    }
}

module.exports = new accountController