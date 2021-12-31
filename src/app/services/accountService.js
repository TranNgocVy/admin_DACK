const { models } = require('../../config/db');
const { Op } = require('sequelize');

//Get one admin account
exports.getOneAccount = (username) => {
    return models.nhanvien.findOne({ where: { USER: username } });
};

//Get one customer account 
exports.getDetailCustomer = (id) => {
    return models.khachhang.findOne({
        where:{
            MAKH: id,
        },
        raw: true
    })
}
// Get All admin account
exports.getAdminAccount = () => {
    return models.nhanvien.findAll({});
};

// Get All customer account
exports.getCustomerAccount = () => {
    return models.khachhang.findAll({
        paranoid: false,
    });
};

//Get models
exports.getmodels = () => {
    return models;
};