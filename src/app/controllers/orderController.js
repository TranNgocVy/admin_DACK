const orderservice = require('../services/orderService');
const { multipleSequelizeToObject,SequelizeToObject } = require('../../util/sequelize');

class orderController {
    //[GET]: /order-manager
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/');
            } else {
                const orderId = req.query.orderId;
                const order = await orderservice.getOrder(orderId);
                res.render('order/order-manager', {
                    title: 'Book Selling',
                    order: multipleSequelizeToObject(order),
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[GET]: /order-detail/:id
    async showDetail(req, res, next) {
            try {
                if (!req.user) {
                    res.redirect('/login');
                } else {

                const id = req.params.id
                const order = await orderservice.getOneOrder(id);
                const detailOrder = await orderservice.getDetailOrder(id);

                    res.render('order/order-detail', {
                        title: 'Book Selling',
                        order: SequelizeToObject(order),
                        detailOrder: multipleSequelizeToObject(detailOrder)
                    });
                }
            } catch (e) {
                next(e);
            }
        }
        //[GET]: /input-order
    input(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                res.render('order/input-order', {
                    title: 'Book Selling',
                });
            }
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new orderController();