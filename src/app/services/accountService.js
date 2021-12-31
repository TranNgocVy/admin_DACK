const { models } = require('../../config/db');
const { Op } = require('sequelize');

//Get one account
exports.getOneAccount = (username) => {
  return models.nhanvien.findOne({ where: { USER: username } });
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
