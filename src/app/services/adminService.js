const { models } = require('../../config/db');
const { Op } = require('sequelize');

// support query database

//Get all publisher
exports.AllNXB = () => {
    return models.nxb.findAll({});
};

// Get all books
exports.getBooks = (title) => {
    var condition = '';
    if (title) {
        condition = title;
    }
    return models.sach.findAll({
        where: {
            tensach: {
                [Op.like]: '%' + condition + '%',
            },
        },
    });
};


// Get All admin account
exports.getAdminAccount = () => {
    return models.nhanvien.findAll({});
};

// Get All customer account
exports.getCustomerAccount = () => {
    return models.khachhang.findAll({});
};

//Get models
exports.getmodels = () => {
    return models;
};