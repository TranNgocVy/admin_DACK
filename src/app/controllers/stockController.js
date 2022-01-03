const stockservice = require('../services/stockService');
const { multipleSequelizeToObject } = require('../../util/sequelize');
const { ne } = require('sequelize/dist/lib/operators');

const MAX_ROW_ON_PAGE = 24;
class stockController {

    //[GET]: /stock-manager
    async showStock(req, res, next) {
        const title = req.query.title;
        var month = req.query.month;
        var update = req.query.update;

        try {
            if (!req.user) {
                res.redirect('/login');
            } else {
                var page = req.params.page;
                console.log(page);
                if (!page) {
                    page = 1;
                }

                if (!month) {
                    let date = new Date();
                    month =
                        date.getFullYear().toString() +
                        '-' +
                        ('0' + (date.getMonth() + 1).toString()).slice(-2);
                }

                if (update) {
                    await stockservice.updateStock(month);
                }
                const books = await stockservice.getStock(title, month);
                const renderBooks = multipleSequelizeToObject(books);
                const l = renderBooks.length;
                const start = (page - 1) * MAX_ROW_ON_PAGE;
                const end = (page * MAX_ROW_ON_PAGE) > (l) ? (l) : (page * MAX_ROW_ON_PAGE);
                console.log(start);
                console.log(end);


                res.render('stock/stock-manager', {
                    books: renderBooks.slice(start, end),
                    month,
                    title,
                    total: Math.ceil(l / MAX_ROW_ON_PAGE),
                    current: parseInt(page - 1),
                });
            }
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new stockController();