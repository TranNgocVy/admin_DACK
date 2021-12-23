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

//get 1 NXB
exports.getOneNXB = async (nxb) => {
    return await models.nxb.findOne({
        where:{
            manxb: nxb
        },
        raw: true
    });
}

//get sach from NXB
exports.getSachNXBs = async (NXB) => {
    return await models.sach.findAll({
        where: {
            manxb: NXB
        },
        raw: true
    })
}

//get sach base on 'name' and 'pulisher' 
exports.getBookNameNXB = async (name, pulisher) => {
    console.log(pulisher)

    return await models.sach.findOne({
        where: {
            manxb: pulisher,
            tensach: {
                [Op.like]: name

            }

        },
        raw: true
    })
}