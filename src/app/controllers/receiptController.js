const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class receiptController {
    //[GET]: /receipt-manager
    show(req, res, next) {
        res.render('receipt/receipt-manager', {
            title: "Book Selling"
        });
    }

    //[GET]: /receipt-detail
    showDetail(req, res, next) {
        res.render('receipt/receipt-detail', {
            title: "Book Selling"
        });
    }
}

module.exports = new receiptController