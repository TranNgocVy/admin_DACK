const orderservice = require('../services/orderService');
const {
    multipleSequelizeToObject,
    SequelizeToObject,
} = require('../../util/sequelize');
const { or } = require('sequelize/dist');

const MAX_ROW_ON_PAGE = 24;
class orderController {
    //[GET]: /order-manager
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/');
            } else {
                var page = req.params.page;

                if (!page) {
                    page = 1;
                }
                const search = req.query.search;
                const order = await orderservice.getOrder(search);
                const l = order[0].length;
                const start = (page - 1) * MAX_ROW_ON_PAGE;
                const end = (page * MAX_ROW_ON_PAGE) > (l) ? (l) : (page * MAX_ROW_ON_PAGE);

                res.render('order/order-manager', {
                    title: 'Book Selling',
                    order: order[0].slice(start, end),
                    total: Math.ceil(l / MAX_ROW_ON_PAGE),
                    current: parseInt(page - 1),
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
                const id = req.params.id;
                const order = await orderservice.getOneOrder(id);

                const detailOrder = await orderservice.getDetailOrder(id);

                res.render('order/order-detail', {
                    title: 'Book Selling',
                    order: SequelizeToObject(order),
                    detailOrder: multipleSequelizeToObject(detailOrder),
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

                const order = req.session.order;
                const publisher = req.session.publisher;
                const totalmoney = req.session.totalmoney ? req.session.totalmoney : 0
                res.render('order/input-order', {
                    name: req.user.HOTEN,
                    NXB,
                    order,
                    publisher,
                    totalmoney
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[POST]: orders/input-order
    async submit(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                await orderservice.getNXBs();

                res.redirect('/orders/order-manager');
            }
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new orderController();