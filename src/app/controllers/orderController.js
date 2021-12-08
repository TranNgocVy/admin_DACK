const adminservice = require('../services/adminService');
const { multipleSequelizeToObject } = require('../../util/sequelize');

class orderController {
  //[GET]: /order-manager
  show(req, res, next) {
    try {
      if (!req.user) {
        res.redirect('/');
      } else {
        res.render('order/order-manager', {
          title: 'Book Selling',
        });
      }
    } catch (e) {
      next(e);
    }
  }

  //[GET]: /order-detail
  showDetail(req, res, next) {
    try {
      if (!req.user) {
        res.redirect('/login');
      }
      res.render('order/order-detail', {
        title: 'Book Selling',
      });
    } catch (e) {
      next(e);
    }
  }
  //[GET]: /input-order
  input(req, res, next) {
    try {
      if (!req.user) {
        res.redirect('/login');
      }
      res.render('order/input-order', {
        title: 'Book Selling',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new orderController();
