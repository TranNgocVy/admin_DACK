const receiptservice = require('../services/receiptService');
const { multipleSequelizeToObject,SequelizeToObject } = require('../../util/sequelize');

class receiptController {
    //[GET]: /receipt-manager
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                const search = req.query.search;
                var receipt = await receiptservice.getReceipt(search);
                res.render('receipt/receipt-manager', {
                    receipt: receipt[0]
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[GET]: /receipt-detail/:id
    async showDetail(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                const id = req.params.id
                const receipt = await receiptservice.getOneReceipt(id);
                const detailReceipt = await receiptservice.getDetailReceipt(id);
                res.render('receipt/receipt-detail', {
                    receipt: SequelizeToObject(receipt),
                    detailReceipt: multipleSequelizeToObject(detailReceipt)

                });
            }
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new receiptController();