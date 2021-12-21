const orderservice = require('../services/orderService');
const { multipleSequelizeToObject } = require('../../util/sequelize');

class orderController {
    //[GET]: /order-manager
    show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/');
            } else {
                res.render('order/order-manager', {
                    title: 'Book Selling',
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[GET]: /order-detail
    showDetail(req, res, next) {
            try {
                if (!req.user) {
                    res.redirect('/login');
                } else {
                    res.render('order/order-detail', {
                        title: 'Book Selling',
                    });
                }
            } catch (e) {
                next(e);
            }
        }
    //[GET]: /input-order
    async input(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                var NXB = await orderservice.getNXBs()
                res.render('order/input-order', {
                    title: 'Book Selling',
                    NXB
                });
            }
        } catch (e) {
            next(e);
        }
    }
    //[GET]: orders/api/getBookNXB
    async getBookNXB(req, res, next){
        try {
            if(true){
                var NXB = req.query.NXB
                var books = await orderservice.getSachNXBs(NXB)
                res.status(201).json({books})
            }else{
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new orderController();