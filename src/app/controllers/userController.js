const adminservice = require('../services/adminService');
const { SequelizeToObject } = require('../../util/sequelize');

class userController {
  //[GET]: /users/:username
  async show(req, res, next) {
    try {
      if (!req.user) {
        res.redirect('/login');
      }

      const account = await adminservice.getOneAccount(req.params.username);
      res.render('user/personal-page', {
        user: SequelizeToObject(account),
      });
    } catch (e) {
      next(e);
    }
  }

  //[PUT]: users/:username/edit
  async edit(req, res, next) {
    try {
      if (!req.user) {
        res.redirect('/login');
      }
      const account = await adminservice.getOneAccount(req.params.username);

      account.set(req.body);

      await account.save();
      res.redirect('back');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new userController();
