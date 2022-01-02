const bookservice = require('../services/bookService');
const orderservice = require('../services/orderService');

const {
    multipleSequelizeToObject,
    SequelizeToObject,
} = require('../../util/sequelize');

class bookController {
    //[PUT] : /books/save/:id
    async saveUpdate(req, res, next) {
            try {
                if (!req.user) {
                    res.redirect('/login');
                } else {
                    const book = await bookservice.updateBook(req);
                    res.redirect('/books/book-manager');
                }
            } catch (e) {
                next(e);
            }
        }
        //[GET]: books/:id/edit
    async edit(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                const book = await bookservice.getOnebook(req.params.id);
                const NXB = await bookservice.AllNXB();
                res.render('book/edit', {
                    NXB: multipleSequelizeToObject(NXB),
                    sach: SequelizeToObject(book),
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[GET] : /books/input-new-book
    async inputbook(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {

                //Khi chuyển từ trang thêm phiếu nhập về trang thêm sách sẽ có thêm 1 query là bookname và NXB
                var name = req.query.bookname
                var NXB = req.query.NXB
                var isAddBook = req.query.isAddBook

                if(!name){
                    name = ''
                }
                if(!NXB){
                    NXB = ''
                }

                const error = req.query.namebookerro;
                const cate = await bookservice.getmodels().theloai.findAll();
                const publisher = await bookservice.AllNXB();
                res.render('book/newbook', {
                    name,
                    NXB,
                    isAddBook,
                    publisher: multipleSequelizeToObject(publisher),
                    Theloai: multipleSequelizeToObject(cate),
                    error,
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[GET] : /books/book-manager
    async show(req, res, next) {
        const title = req.query.title;
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                const books = await bookservice.getBooks(title);
                const count = await bookservice.countDeleteBook();
                res.render('book/book-manager', {
                    books: multipleSequelizeToObject(books),
                    count,
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[POST] : /books/book-manager
    async addBook(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                if (
                    req.body.tensach == '' ||
                    req.body.tacgia == '' ||
                    req.body.manxb == '' ||
                    req.body.ngayXB == ''
                ) {
                    res.redirect('/books/input-new-book?namebookerro=true');
                } else {
                    req.body.masach = await bookservice.genKeybook(req.body.hinhthuc);
                    // insert book to db
                    const book = await  bookservice.createBook(req);
                    //back to book-manager
                    // res.json(book)
                    if (req.body.isAddBook){
                        var order = req.session.order ? req.session.order: [];
                        var totalmoney = req.session.totalmoney ? req.session.totalmoney: 0;

                        order.push({item: book, quantity: 1, subtotal: Number(book.gia)});
                        totalmoney += Number(book.gia)


                        req.session.order = order
                        req.session.publisher = req.body.manxb
                        req.session.totalmoney = totalmoney;

                        res.redirect('/orders/input-order')
                    }
                    else {
                        res.redirect('/books/book-manager');
                    }
                }
            }
        } catch (e) {
            next(e);
        }
    }

    //[DELETE]:  /books/save/:id
    async saveDelete(req, res, next) {
            try {
                if (!req.user) {
                    res.redirect('/login');
                } else {
                    await bookservice.DeleteBook(req);
                    res.redirect('/books/book-manager');
                }
            } catch (error) {
                next(error);
            }
        }
        //[GET]: /books/book-manager-trash
    async showTrash(req, res, next) {
        try {
            if (req.user) {
                var books = await bookservice.getlistdeletedBook();
                res.render('book/book-manager-trash', {
                    books: multipleSequelizeToObject(books),
                });
            } else {
                res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
    }

    //[DELETE]: /books/save/:id/delete
    async deleteTrash(req, res, next) {
        try {
            if (req.user) {
                await bookservice.deletBookForce(req);
                res.redirect('/books/book-manager-trash');
            } else {
                res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
    }

    //[PATH]: /books/save/:id/restore
    async restoreTrash(req, res, next) {
        try {
            if (req.user) {
                await bookservice.restorebook(req);
                res.redirect('/books/book-manager-trash');
            } else {
                res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new bookController();