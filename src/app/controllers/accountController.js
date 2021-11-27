const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class accountController {
    //[GET]: /account-manager
    show(req, res, next) {
        res.render('account/account-manager', {
            title: "Book Selling"
        });
    }
}

module.exports = new accountController