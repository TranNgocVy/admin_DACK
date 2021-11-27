const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class bookController {
    //[GET] : /book/input-new-book
    async inputbook(req, res, next) {
        try {
            const NXB = await adminservice.AllNXB()
            res.render('book/newbook', {
                NXB: multipleSequelizeToObject(NXB)
            });
        } catch (e) {
            next(e)
        }
    }



    //[GET] : /book/book-manager
    async show(req, res, next) {
        const title = req.query.title;
        try {
            const books = await adminservice.getBooks(title);
            res.render('book/book-manager', {
                books: multipleSequelizeToObject(books)
            });
        } catch (e) {
            next(e)
        }
    }

    //[POST] : /book/book-manager
    async addBook(req, res, next) {

        req.body.masach = await adminservice.genKeybook(req.body.hinhthuc);
        // insert book to db
        const book = await adminservice.getmodels().sach.create({
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
        res.redirect('/books/book-manager')
        next();

    }
}

module.exports = new bookController