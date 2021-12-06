const adminservice = require('../services/adminService');
const {
    SequelizeToObject
} = require('../../util/sequelize')

<<<<<<< HEAD
class userController {
=======
class stockController {
>>>>>>> b3616051e09a8c76a59f528b38535c3897b02883

    //[GET]: /users/:username
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
<<<<<<< HEAD

            const account = await adminservice.getOneAccount(req.params.username);
            
=======
            console.log(req.user);
>>>>>>> b3616051e09a8c76a59f528b38535c3897b02883
            res.render('user/personal-page', {
                user: SequelizeToObject(account)
            });
        } catch (e) {
            next(e)
        }
    }

    //[PUT]: users/:username/edit
    async edit(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            const account = await adminservice.getOneAccount(req.params.username);


            account.set(req.body)

            // res.send(req.body)

            await account.save();
            res.redirect('back')
        } catch (e) {
            next(e);
        }
    }
}



module.exports = new userController