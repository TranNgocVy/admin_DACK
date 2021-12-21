const { models } = require('../../config/db');
const { Op } = require('sequelize');
//Get books from stock has title as "title" in month "month"
exports.getStock = (title, month) => {
    var tit = '';
    if (title) {
        tit = title;
    }

    var m = month.replace('-','')
    
    return models.tonkho.findAll({
        where:{
            NGAYTHANG: {
                [Op.like]: m,
            },
        },
        include: [{
            model: models.sach,
            as: 'masach_sach',
            where: {
                tensach: {
                    [Op.like]: '%' + tit + '%',
                },
            },
        }, ],
    });
};