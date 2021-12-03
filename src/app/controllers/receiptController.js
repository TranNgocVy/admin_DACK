const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class receiptController {
    //[GET]: /receipt-manager
    show(req, res, next) {
        try{
            if (!req.user){
                res.redirect('/login')
            }
            res.render('receipt/receipt-manager', {
                title: "Book Selling"
            });
        }catch (e) {
            next(e)
        }
    }

    //[GET]: /receipt-detail
    showDetail(req, res, next) {
        try {
            if (!req.user){
                res.redirect('/login')
            }
            res.render('receipt/receipt-detail', {
                title: "Book Selling"
            });
        }catch (e) {
            next(e)
        }

    }
}

module.exports = new receiptController