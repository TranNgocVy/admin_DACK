const adminservice = require('../services/adminService');
const {
    SequelizeToObject
} = require('../../util/sequelize')

class stockController {

    //[GET]: /users/:username
    async show(req, res, next) {
        try {
            if (!req.user) {
                res.redirect('/login')
            }
            console.log(req.user);
            res.render('user/personal-page', {
                user: req.user
            });
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new stockController