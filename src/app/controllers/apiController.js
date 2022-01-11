const apiservice = require('../services/apiService');
const orderservice = require('../services/orderService');
const {
    multipleSequelizeToObject,
    SequelizeToObject,
} = require('../../util/sequelize');
const {
    or
} = require('sequelize/dist');

class apiController {
    //[GET]: /api/orders/getBookNXB
    async getBookNXB(req, res, next) {
        try {
            if (req.user) {
                var NXB = req.query.NXB;
                var books = await apiservice.getSachNXBs(NXB);
                var publisher = await apiservice.getOneNXB(NXB);

                var message;

                if (!books) {
                    message = 'Loại sách này chưa nhập từ nhà xuất bản này.';
                }
                res.status(201).json({
                    publisher,
                    books,
                    message,
                });
            } else {
                res.status(500).json({});
            }
        } catch (error) {
            next(error);
        }
    }

    //[GET]: /api/orders/getBookNameNXB
    async getBookNameNXB(req, res, next) {
        try {
            if (req.user) {
                var name = req.query.bookName;
                var publisher = req.query.nxb;

                var book = await apiservice.getBookNameNXB(name, publisher);
                var message;

                var order = req.session.order ? req.session.order : [];

                order.push({
                    item: book,
                    quantity: 1,
                    subtotal: Number(book.gia)
                });

                var totalmoney = req.session.totalmoney ? req.session.totalmoney : 0;
                totalmoney += book.gia

                req.session.order = order;
                req.session.publisher = publisher;
                req.session.totalmoney = totalmoney;

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

    //[POST]: /api/orders/submit
    async submit(req, res, next) {
        try {
            if (req.user) {
                const publisher = req.body.NXB;
                const idList = req.body.idList;
                const quantityList = req.body.quantityList;
                const mapn = await apiservice.genKeyOrder();

                await apiservice.createOrder(mapn, publisher, req.user.MANV);
                await apiservice.createDetailOrder(mapn, idList, quantityList);

                req.session.order = []
                req.session.publisher = ""
                req.session.totalmoney = 0

                res.status(201).json({})
            } else {
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }

    //[DELETE]: /api/orders/remove
    async removeItem(req, res, next) {
        try {
            if (req.user) {
                const index = req.params.index
                var order = req.session.order
                var totalmoney = req.session.totalmoney

                const deletedItem = order.splice(index, 1);

                totalmoney -= deletedItem[0].subtotal

                req.session.order = order
                req.session.totalmoney = totalmoney

                res.status(201).json({})
            } else {
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }

    //[PUT]: /api/orders/update
    async updateItem(req, res, next) {
        try {
            if (req.user) {
                const index = req.params.index;
                const quantity = req.body.quantity;

                var order = req.session.order;
                var totalmoney = req.session.totalmoney

                totalmoney -= order[index].subtotal

                order[index].quantity = quantity;
                order[index].subtotal = order[index].item.gia * quantity;

                totalmoney += order[index].subtotal

                req.session.order = order;
                req.session.totalmoney = totalmoney
                res.status(201).json({})
            } else {
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }


    //[PUT]: /api/accounts/lockOrUnlockAccount
    async lockCustomer(req, res, next) {
        try {
            if (req.user) {
                var MAKH = req.body.MAKH
                var status = req.body.status

                await apiservice.updateStatusCustomer(MAKH, status);
                res.status(201).json({})

            } else {
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }
    async getRevenue(req, res, next) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const datas = await orderservice.getAllDatHang();
        const data = datas[0];

        var displayDatas = {};
        for (let i = 0; i < data.length; i++) {
            const month = monthNames[parseInt((new Date(data[i].THOIGIAN)).getUTCMonth())];
            const year = String((new Date(data[i].THOIGIAN)).getUTCFullYear());
            const key = month + "-" + year;
            if (!displayDatas[key]) {
                displayDatas[key] = {
                    qty: data[i].SOLUONG,
                    money: data[i].SOLUONG * data[i].gia,
                };
            } else {

                displayDatas[key].qty += data[i].SOLUONG;
                displayDatas[key].money += data[i].SOLUONG * data[i].gia;
            }
        }
        res.send(displayDatas);
    }
}


module.exports = new apiController();