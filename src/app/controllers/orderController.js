const orderservice = require('../services/orderService');
const {
    multipleSequelizeToObject,
    SequelizeToObject
} = require('../../util/sequelize');

class orderController {
    //[GET]: /order-manager
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/');
            } else {
                const search = req.query.search;
                const order = await orderservice.getOrder(search);
                console.log(order)
                res.render('order/order-manager', {
                    title: 'Book Selling',
                    order: order[0],
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
    async input(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                var NXB = await orderservice.getNXBs()
                res.render('order/input-order', {
                    title: 'Book Selling',
                    user: req.user.HOTEN,
                    NXB
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
                console.log(req.body)
                await orderservice.getNXBs()

                res.redirect('/orders/order-manager');
            }
        } catch (e) {
            next(e);
        }
    }
    //[GET]: orders/api/getBookNXB
    async getBookNXB(req, res, next) {
        try {
            if (req.user) {
                var NXB = req.query.NXB
                var books = await orderservice.getSachNXBs(NXB);
                var publisher = await orderservice.getOneNXB(NXB);

                var message;

                if (!books) {
                    message = "Loại sách này chưa nhập từ nhà xuất bản này.";
                }
                res.status(201).json({
                    publisher,
                    books,
                    message
                })
            } else {
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }

    //[GET]: orders/api/getBookNameNXB
    async getBookNameNXB(req, res, next) {
        try {
            if (req.user) {
                var name = req.query.bookName
                var publisher = req.query.nxb

                var book = await orderservice.getBookNameNXB(name, publisher);
                var message;

                if (!book) {
                    message = "Chưa từng nhập sách'" + name + "'";
                }
                res.status(201).json({
                    book,
                    message
                })
            } else {
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new orderController();