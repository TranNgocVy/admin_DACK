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
                var type = req.query.type;
                if (!type) {
                    type = "admin";
                }

                const customerAccount = await adminservice.getCustomerAccount();

                var data = multipleSequelizeToObject(adminAccount);
                var check = true;
                if (type == "customer") {
                    data = multipleSequelizeToObject(customerAccount);
                    check = false;
                }

                console.log(data);


                // console.log(adminAccount);
                res.render('account/account-manager', {
                    title: "Book Selling",
                    accounts: data,
                    type: check
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