const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class orderController {
    //[GET]: /order-manager
    show(req, res, next) {
        res.render('order/order-manager', {
            title: "Book Selling"
        });
    }

    //[GET]: /order-detail
    showDetail(req, res, next) {
        res.render('order/order-detail', {
            title: "Book Selling"
        });
    }
    //[GET]: /input-order
    input(req, res, next) {
        res.render('order/input-order', {
            title: "Book Selling"
        });
    }
}

module.exports = new orderController