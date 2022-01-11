const receiptservice = require('../services/receiptService');
const {
    multipleSequelizeToObject,
    SequelizeToObject,
} = require('../../util/sequelize');
const MAX_ROW_ON_PAGE = 24;
class receiptController {
    //[GET]: /receipt-manager
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                var page = req.params.page;

                if (!page) {
                    page = 1;
                }
                const search = req.query.search;
                var receipt = await receiptservice.getReceipt(search);
                const l = receipt[0].length;
                const start = (page - 1) * MAX_ROW_ON_PAGE;
                const end = (page * MAX_ROW_ON_PAGE) > (l) ? (l) : (page * MAX_ROW_ON_PAGE);

                res.render('receipt/receipt-manager', {
                    title: 'Book Selling',
                    receipt: receipt[0].slice(start, end),
                    total: Math.ceil(l / MAX_ROW_ON_PAGE),
                    current: parseInt(page - 1),
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
                const id = req.params.id;
                const receipt = await receiptservice.getOneReceipt(id);
                const detailReceipt = await receiptservice.getDetailReceipt(id);
                res.render('receipt/receipt-detail', {
                    title: 'Book Selling',
                    receipt: SequelizeToObject(receipt),
                    detailReceipt: multipleSequelizeToObject(detailReceipt),
                });
            }
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new receiptController();