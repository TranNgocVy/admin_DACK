const { models } = require('../../config/db');
const { Op } = require('sequelize');
//Get all books from stock
exports.getStock = (title) => {
    var condition = '';
    if (title) {
        condition = title;
    }
    return models.tonkho.findAll({
        include: [{
            model: models.sach,
            as: 'masach_sach',
            where: {
                tensach: {
                    [Op.like]: '%' + condition + '%',
                },
            },
        }, ],
    });
};