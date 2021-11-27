const adminservice = require('../services/adminService');
const {
    multipleSequelizeToObject
} = require('../../util/sequelize')

class stockController{
    
     //[GET]: /stock-manager
     async showStock(req, res, next) {
        const title = req.query.title;
        try {
            const books = await adminservice.getStock(title);
            res.render('stock/stock-manager', {
                books: multipleSequelizeToObject(books)
            });
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new stockController