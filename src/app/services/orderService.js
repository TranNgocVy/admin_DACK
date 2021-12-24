const {
    models
} = require('../../config/db');
const {
    Op
} = require('sequelize');

//Get models
exports.getmodels = () => {
    return models;
};

//Get all order has id like "id"
exports.getOrder = (orderId) => {
    var id = '';
    if (orderId) {
        id = orderId;
    }

    return models.phieunhap.findAll({
        where: {
            MAPN: {
                [Op.like]: '%' + id + '%',
            },
        },
        include: [{
            model: models.nxb,
            as: 'MANXB_nxb',
        }, ],
    });
};

//Get one order has id like "id"
exports.getOneOrder = (orderId) => {
    var id = '';
    if (orderId) {
        id = orderId;
    }

    return models.phieunhap.findOne({
        where: {
            MAPN: {
                [Op.like]: id,
            },
        },
        include: [{
            model: models.nxb,
            as: 'MANXB_nxb',
        }, ],

        include: [{
            model: models.nhanvien,
            as: 'MANV_nhanvien',
        }]
    });
};

//Get detail order has id as "id"
exports.getDetailOrder = (orderId) => {
    var id = '';
    if (orderId) {
        id = orderId;
    }

    return models.ct_phieunhap.findAll({
        where: {
            MAPN: {
                [Op.like]: id,
            },
        },
        include: [{
            model: models.sach,
            as: 'MASACH_sach',

        }, ],
    });
};

//get NXB
exports.getNXBs = async () => {
    return await models.nxb.findAll({
        raw: true
    });
}

