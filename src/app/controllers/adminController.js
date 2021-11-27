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