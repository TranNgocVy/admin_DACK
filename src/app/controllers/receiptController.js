const receiptservice = require('../services/receiptService');
const { multipleSequelizeToObject,SequelizeToObject } = require('../../util/sequelize');

class receiptController {
    //[GET]: /receipt-manager
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                const receiptId = req.query.receiptId;
                const receipt = await receiptservice.getReceipt(receiptId);

                res.render('receipt/receipt-manager', {
                    title: 'Book Selling',
                    receipt: multipleSequelizeToObject(receipt)
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
                    title: 'Book Selling',
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