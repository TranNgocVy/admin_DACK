const adminservice = require('../services/adminService');
const orderservice = require('../services/orderService');
const bookservice = require('../services/bookService');
const { multipleSequelizeToObject } = require('../../util/sequelize');
const passport = require('../../config/auth/passport');

class adminController {
    //[POST]: /book/store
    async store(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            }
            req.body.masach = await bookservice.genKeybook(req.body.hinhthuc);
            // insert book to db
            const book = await bookservice.getsachs().create({
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
            //back to create book
            res.redirect('back');
        } catch (e) {
            next(e);
        }
    }

    //[GET]: /login
    async login(req, res, next) {
            try {
                if (!req.user) {
                    res.render('login', {
                        title: 'Book Selling',
                        invalidlogin: req.query.invalidlogin,
                    });
                } else res.render('/account/account-manager');
            } catch (e) {
                next(e);
            }
        }
        //[GET]: /forget
    forgetpass(req, res, next) {
        try {
            res.render('forgetpass', {
                title: 'Book Selling',
            });
        } catch (e) {
            next(e);
        }
    }

    //[GET]: /
    main(req, res, next) {
        try {
            if (req.user) {
                res.redirect('/accounts/account-manager');
            } else {
                res.redirect('/login');
            }
        } catch (e) {
            next(e);
        }
    }

    //[POST] : /login-handler
    loginHandler(req, res, next) {
        try {
            if (req.user) {
                res.redirect('/accounts/account-manager');
            } else res.redirect('/login');
        } catch (e) {
            next(e);
        }
    }

    //[GET] : /logout
    logout(req, res, next) {
            try {
                req.logout();
                res.redirect('/');
            } catch (e) {
                next(e);
            }
        }
        //[GET] /revenue
    async showRevenue(req, res, next) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const datas = await orderservice.getAllDatHang();
        const data = datas[0];
        console.log(datas[0][0]);
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
        console.log(displayDatas);
        console.log(Object.keys(displayDatas));
        console.log(Object.values(displayDatas));
        res.render("revenue", { months: Object.keys(displayDatas) });
    }
}

module.exports = new adminController();