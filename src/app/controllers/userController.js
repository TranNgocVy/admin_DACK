const userservice = require('../services/userService');

const { SequelizeToObject } = require('../../util/sequelize');

class userController {
    //[GET]: /users/:username
    async show(req, res, next) {
        try {


            if (!req.user) {
                res.redirect('/login');
            } else {
                const account = await userservice.getOneAccount(req.params.username);
                res.render('user/personal-page', {
                    user: SequelizeToObject(account),
                });
            }
        } catch (e) {
            next(e);
        }
    }

    //[PUT]: users/:username/edit
    async edit(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                var account = await userservice.getOneAccount(req.params.username);
                if (req.file) {
                    // req.user.HINHANH = req.file.path;
                    userservice.uploadImage(req, account);
                } else {
                    account.set(req.body);
                    await account.save();
                }
                res.redirect('back');

            }
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new userController();