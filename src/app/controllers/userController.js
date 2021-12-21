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
    // [POST]: user/:username/changepass
    async changepass (req, res, next) {
        try {
            if(req.user){
                if(req.user.USER == req.params.username){
                    var check = !(await userservice.changePass(req))
                    res.redirect(`/users/${req.user.USER}/changepass?passErr=${check}`)
                }else{
                    res.send('respond with a resource'); 
                }
            }else{
                res.redirect('/')
            }
        } catch (error) {
            next(error);
        }
    }
    // [GET]: user/:username/changepass
    async getchangepass (req, res, next) {
        try {
            if(req.user){
                if(req.user.USER === req.params.username){
                    var message;
                    var titile = req.query.passErr
                    if(titile == 'true'){
                        message = 'password old wrong'
                        console.log(titile)
                    }
                    if(titile == 'false'){
                        message = 'change success'
                        console.log(titile)
                    }
                    console.log(message)
                    res.render('user/changepass', {message})
                }else{
                    res.send('respond with a resource'); 
                }
            }else{
                res.redirect('/')
            }
            
        } catch (error) {
            next(error);
        }
    }



}

module.exports = new userController();