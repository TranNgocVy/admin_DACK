const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class accountController {
    //[GET]: /account-manager
    async show(req, res, next) {
        try {
            if (req.user) {
                const adminAccount = await adminservice.getAdminAccount();
                const customerAccount = await adminservice.getCustomerAccount();
                console.log(adminAccount);
                res.render('account/account-manager', {
                    title: "Book Selling",
                    accounts: multipleSequelizeToObject(adminAccount)
                });
            } else {
                res.redirect("/")
            }
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new accountController