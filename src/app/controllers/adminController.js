const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')
class adminController {

    //[POST]: /book/store
    async store(req, res, next) {
        req.body.masach = await adminservice.genKeybook(req.body.hinhthuc);
        // insert book to db
        const book = await adminservice.getsachs().create({
            masach: req.body.masach,
            tensach: req.body.tensach,
            tacgia : req.body.tacgia,
            MOTA : req.body.MOTA,
            HINHANH : req.body.HINHANH,
            manxb : req.body.manxb,
            ngayXB : req.body.ngayXB,
            gia : req.body.gia,
            SL : 0,
        });
        //back to create book
        res.redirect('back')
        next();
    }
    //[GET] : /book/input-new-book
    async inputbook(req, res, next) {
        try {
            const NXB = await adminservice.AllNXB()
        res.render('book/newbook', {
            NXB: multipleSequelizeToObject(NXB)
        });
        }catch (e) {
            next(e)
        }
    }
    //[GET]: /account-manager
    accountM(req, res, next) {
        res.render('account/account-manager', {
            title: "Book Selling"
        });
    }
    //[GET]: /receipt-manager
    receiptM(req, res, next) {
        res.render('receipt/receipt-manager', {
            title: "Book Selling"
        });
    }
    //[GET]: /order-manager
    orderM(req, res, next) {
        res.render('order/order-manager', {
            title: "Book Selling"
        });
    }
    //[GET]: /stock-manager
    stockM(req, res, next) {
        res.render('stock/stock-manager', {
            title: "Book Selling"
        });
    }
    //[GET]: /input-order
    InputO(req, res, next) {
        res.render('order/input-order', {
            title: "Book Selling"
        });
    }
    //[GET]: /order-detail
    OrderD(req, res, next) {
        res.render('order/order-detail', {
            title: "Book Selling"
        });
    }
    //[GET]: /receipt-detail
    receiptD(req, res, next) {
        res.render('receipt/receipt-detail', {
            title: "Book Selling"
        });
    }
    //[GET]: /login
    async login(req, res, next) {
        const acc = await adminservice.oneAd();
        //  res.send(acc);
        res.render('login', {
            title: "Book Selling"
        });
    }
    //[GET]: /forget
    forgetpass(req, res, next) {
        res.render('forgetpass', {
            title: "Book Selling"
        });
    }
}
module.exports = new adminController