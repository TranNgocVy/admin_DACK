const adminservice = require('../services/adminService');
const { multipleSequelizeToObject } = require('../../util/sequelize');
const { ne } = require('sequelize/dist/lib/operators');

class stockController {
  //[GET]: /stock-manager
  async showStock(req, res, next) {
    const title = req.query.title;
    try {
      if (!req.user) {
        res.redirect('/login');
      } else {
        const books = await adminservice.getStock(title);
        res.render('stock/stock-manager', {
          books: multipleSequelizeToObject(books),
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new stockController();
