const adminservice = require("../services/adminService");
const orderservice = require("../services/orderService");
const bookservice = require("../services/bookService");
const userservice = require("../services/userService");
const { multipleSequelizeToObject } = require("../../util/sequelize");
const passport = require("../../config/auth/passport");

class adminController {
  //[POST]: /book/store
  async store(req, res, next) {
    try {
      if (!req.user) {
        res.redirect("/login");
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
      res.redirect("back");
    } catch (e) {
      next(e);
    }
  }

  //[GET]: /login
  async login(req, res, next) {
    try {
      if (!req.user) {
        res.render("login", {
          title: "Book Selling",
          invalidlogin: req.query.invalidlogin,
        });
      } else res.render("/account/account-manager");
    } catch (e) {
      next(e);
    }
  }

  //[GET]: /
  main(req, res, next) {
    try {
      if (req.user) {
        res.redirect("/accounts/account-manager");
      } else {
        res.redirect("/login");
      }
    } catch (e) {
      next(e);
    }
  }

  //[POST] : /login-handler
  loginHandler(req, res, next) {
    try {
      if (req.user) {
        res.redirect("/accounts/account-manager");
      } else res.redirect("/login");
    } catch (e) {
      next(e);
    }
  }

  // [GET]: /forgetpass
  forgetpass(req, res, next) {
    res.render("user/forgetpass", {
      title: "NoName",
    });
    return;
  }
  // [POST]: /forgetpass
  async forgetPost(req, res, next) {
    try {
      var email = await userservice.getMail(req);
      const token = await userservice.sendEmail(email);
      var messages;
      if (token) {
        let hide = email.EMAIL.split("@")[0].length - 2; //<-- number of characters to hide
        var r = new RegExp(".{" + hide + "}@", "g");
        var jmail = email.EMAIL.replace(r, "***@");
        messages = ` vui lòng check mail ${jmail} để lấy link  ( tồn tại trong 20 phút ) `;
      } else {
        messages = ` Đã có lỗi xảy ra , xin hãy thử lại  `;
      }
      res.render("user/inforget", { messages });
    } catch (error) {
      next(error);
    }
  }

  //[GET] : /reset-password
  async resetPass(req, res, next) {
    try {
      const token = req.query.token;
      const check = await userservice.checktoken(token);
      if (check) {
        res.render("user/repass", { token });
      } else {
        res.send("respond with a resource");
      }
    } catch (error) {
      next(error);
    }
  }
  //[POST] : /reset-password
  async resetPassPost(req, res, next) {
    try {
      const change = await userservice.resetPass(req);
      if (change) {
        res.redirect("/login");
      } else {
        res.redirect("back");
      }
    } catch (error) {
      next(error);
    }
  }

  //[GET] : /logout
  logout(req, res, next) {
    try {
      req.logout();
      res.redirect("/");
    } catch (e) {
      next(e);
    }
  }
  //[GET] /revenue
  async showRevenue(req, res, next) {
    if (req.user) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const datas = await orderservice.getAllDatHang();
      const data = datas[0];

      var displayDatas = {};
      for (let i = 0; i < data.length; i++) {
        const month =
          monthNames[parseInt(new Date(data[i].THOIGIAN).getUTCMonth())];
        const year = String(new Date(data[i].THOIGIAN).getUTCFullYear());
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

      res.render("revenue", { months: Object.keys(displayDatas) });
    } else {
      res.redirect("/login");
    }
  }
}

module.exports = new adminController();
