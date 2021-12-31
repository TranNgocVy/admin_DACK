const accountservice = require('../services/accountService');
const authservice = require('../services/authService');
const passport = require('../../config/auth/passport');
const { multipleSequelizeToObject } = require('../../util/sequelize');
const cloudImage = require('../../config/uploadIMG/cloudinary');
class accountController {
    //[GET]: accounts/account-manager
    async show(req, res, next) {
            try {
                if (req.user) {
                    var accounts;
                    var type = req.query.type;
                    var admin = true;

                    if (!type) {
                        type = 'admin';
                    }
                    if (type === 'admin') {
                        accounts = await accountservice.getAdminAccount();
                    } else {
                        accounts = await accountservice.getCustomerAccount();
                    // res.json(accounts)

                        admin = false;
                    }

                    res.render('account/account-manager', {
                        accounts: multipleSequelizeToObject(accounts),
                        admin,
                    });
                } else {
                    res.redirect('/');
                }
            } catch (e) {
                next(e);
            }
    }
    //[GET]: /accounts/customer/:id
    async detailCustomer(req, res, next){
        try {
            if (req.user) {
                const {id} = req.params;
                const customer = await accountservice.getDetailCustomer(id);
                res.render('account/customer-detail',{
                    customer
                })
            } else {
                res.redirect('/');
            }
        } catch (e) {
            next(e);
        }
    }


    //[GET]: accounts/add
    async add(req, res, next) {
            try {
                if (req.user) {
                    res.render('account/add', {
                        errorEmpty: req.query.errorEmpty,
                        errorUSER: req.query.errorUSER,
                        errorPASS: req.query.errorPASS,
                    });
                } else {
                    res.redirect('/');
                }
            } catch (e) {
                next(e);
            }
        }
        //[POST]: accounts/add
    async adding(req, res, next) {
        try {
            if (req.user) {
                if (
                    req.body.HOTEN === '' ||
                    req.body.USER === '' ||
                    req.body.EMAIL === '' ||
                    req.body.PHAI === '' ||
                    req.body.NGAYSINH === '' ||
                    req.body.SDT === '' ||
                    req.body.PASS === '' ||
                    req.body.REPASS === '' ||
                    req.body.DIACHI === ''
                ) {
                    res.redirect('add?errorEmpty=true');
                    next();
                }
                var check = await authservice.checkUSER(req.body.USER);
                var checkPASS = !(req.body.PASS === req.body.REPASS);
                // check exist user
                if (check) {
                    res.redirect('add?errorUSER=true');
                    next();
                }
                if (checkPASS) {
                    res.redirect('add?errorPASS=true');
                    next();
                }
                req.body.MANV = await authservice.genIDNV();
                req.body.PASS = await authservice.hashPassword(req.body.PASS);
                if (req.file) {
                    var path = 'img/adminImg/' + req.body.MANV + '/';
                    var result = await cloudImage.uploadIMG(req.file.path, path);
                    req.body.HINHANH = result.secure_url;
                    req.body.IDHINHANH = result.public_id;
                }
                var Nhanvien = await authservice.getAdmin().create({
                    MANV: req.body.MANV,
                    HOTEN: req.body.HOTEN,
                    PASS: req.body.PASS,
                    USER: req.body.USER,
                    PHAI: req.body.PHAI,
                    NGAYSINH: req.body.NGAYSINH,
                    HINHANH: req.body.HINHANH,
                    IDHINHANH: req.body.IDHINHANH,
                    EMAIL: req.body.EMAIL,
                    SDT: req.body.SDT,
                    DIACHI: req.body.DIACHI,
                });

                res.redirect('/');
            } else {
                res.redirect('/');
            }
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new accountController();