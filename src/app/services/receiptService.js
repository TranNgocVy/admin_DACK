const { models } = require('../../config/db');
const { Op } = require('sequelize');

//Get models
exports.getmodels = () => {
    return models;
};


//Get all receipt has id like "id"
exports.getReceipt = (receiptId) => {
    var id = '';
    if (receiptId) {
        id = receiptId;
    }

    return models.phieumua.findAll({
        where:{
            MAPM: {
                [Op.like]: '%' + id + '%',
            },
        },
        include: [{
            model: models.khachhang,
            as: 'MAKH_khachhang',
        }, ],
    });
};

//Get one receipt has id like "id"
exports.getOneReceipt = (receiptId) => {
    var id = '';
    if (receiptId) {
        id = receiptId;
    }

    return models.phieumua.findOne({
        where:{
            MAPM: {
                [Op.like]: id,
            },
        },
        include: [{
            model: models.khachhang,
            as: 'MAKH_khachhang',
        }, ],
    });
};

//Get detail receipt has id as "id"
exports.getDetailReceipt = (receiptId) => {
    var id = '';
    if (receiptId) {
        id = receiptId;
    }

    return models.ct_phieumua.findAll({
        where:{
            MAPM: {
                [Op.like]: id ,
            },
        },
        include: [{
            model: models.sach,
            as: 'MASACH_sach',
        }, ],
    });
};
