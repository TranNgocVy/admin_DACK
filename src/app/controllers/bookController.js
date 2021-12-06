const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject,
    SequelizeToObject
} = require('../../util/sequelize')

class bookController {

    //[PUT] : /books/save/:id
    async saveUpdate(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            const book = await adminservice.getOnebook(req.params.id);

            book.set(req.body)
            await book.save();
            res.redirect('/books/book-manager')
        } catch (e) {
            next(e);
        }
    }

    //[GET]: books/:id/edit  
    async edit(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            const book = await adminservice.getOnebook(req.params.id)
            const NXB = await adminservice.AllNXB()
            res.render('book/edit', {
                NXB: multipleSequelizeToObject(NXB),
                sach: SequelizeToObject(book),
            })
        } catch (e) {
            next(e);
        }

    }

    //[GET] : /books/input-new-book
    async inputbook(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            const cate = await adminservice.getmodels().theloai.findAll();
            const NXB = await adminservice.AllNXB()
            res.render('book/newbook', {
                NXB: multipleSequelizeToObject(NXB),
                Theloai: multipleSequelizeToObject(cate),
            });
        } catch (e) {
            next(e)
        }
    }

    //[GET] : /books/book-manager
    async show(req, res, next) {
        const title = req.query.title;
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            const books = await adminservice.getBooks(title);
            res.render('book/book-manager', {
                books: multipleSequelizeToObject(books)
            });
        } catch (e) {
            next(e)
        }
    }

    //[POST] : /books/book-manager
    async addBook(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            req.body.masach = await adminservice.genKeybook(req.body.hinhthuc);
            // insert book to db
            const book = await adminservice.getmodels().sach.create({
                masach: req.body.masach,
                tensach: req.body.tensach,
                tacgia: req.body.tacgia,
                MOTA: req.body.MOTA,
                HINHANH: req.body.HINHANH,
                manxb: req.body.manxb,
                ngayXB: req.body.ngayXB,
                gia: req.body.gia,
                SL: 0,
            });
            req.body.category.forEach(async (element) => {
                await adminservice.getmodels().theloaicuasach.create({
                    masach: req.body.masach,
                    maTL: element,
                });
            });
            //back to create book
            res.redirect('/books/book-manager')
        } catch (e) {
            next(e)
        }
    }


    //[DELETE]:  /books/save/:id
    async saveDelete(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            console.log('here')
            const book = await adminservice.getOnebook(req.params.id)
            await book.destroy();
            res.redirect('/books/book-manager')
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new bookController