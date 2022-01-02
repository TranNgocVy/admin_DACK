const stockservice = require('../services/stockService');
const { multipleSequelizeToObject } = require('../../util/sequelize');
const { ne } = require('sequelize/dist/lib/operators');

class stockController {
  //[GET]: /stock-manager
  async showStock(req, res, next) {
    const title = req.query.title;
    var month = req.query.month;
    try {
      if (!req.user) {
        res.redirect('/login');
      } else {
        if (!month) {
          let date = new Date();
          month =
            date.getFullYear().toString() +
            '-' +
            ('0'+ (date.getMonth() + 1).toString()).slice(-2);

            console.log(month)
        }

        const books = await stockservice.getStock(title, month);
        res.render('stock/stock-manager', {
          books: multipleSequelizeToObject(books),
          month: month,
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new stockController();
