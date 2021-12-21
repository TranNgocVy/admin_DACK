const { models } = require('../../config/db');
const { Op } = require('sequelize');

// Get All customer account
exports.getCustomerAccount = () => {
    return models.khachhang.findAll({});
};
//Get one account
exports.getOneAccount = (username) => {
    return models.nhanvien.findOne({ where: { USER: username } });
};