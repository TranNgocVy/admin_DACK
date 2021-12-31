const apiservice = require('../services/apiService');
const {
    multipleSequelizeToObject,
    SequelizeToObject
} = require('../../util/sequelize');

class apiController {
    //[GET]: /api/orders/getBookNXB
    async getBookNXB(req, res, next) {
        try {
            if (req.user) {
                var NXB = req.query.NXB
                var books = await apiservice.getSachNXBs(NXB);
                var publisher = await apiservice.getOneNXB(NXB);

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

    //[GET]: /api/orders/getBookNameNXB
    async getBookNameNXB(req, res, next) {
        try {
            if (req.user) {
                var name = req.query.bookName
                var publisher = req.query.nxb

                var book = await apiservice.getBookNameNXB(name, publisher);
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

    //[POST]: /api/orders/submit
    async submit(req, res, next) {
        try {
            if (req.user) {
                const publisher = req.body.NXB
                const idList = req.body.idList
                const quantityList = req.body.quantityList
                const mapn = await apiservice.genKeyOrder();

                await apiservice.createOrder(mapn,publisher,req.user.MANV);
                await apiservice.createDetailOrder(mapn,idList,quantityList);

                res.status(201).json({})
            } else {
                res.status(500).json({})
            }
        } catch (error) {
            next(error);
        }
    }

    //[PUT]: /api/accounts/lockOrUnlockAccount
    async lockCustomer(req, res, next){
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

}


module.exports = new apiController();