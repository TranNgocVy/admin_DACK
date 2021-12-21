const { models } = require('../../config/db');
const { Op } = require('sequelize');

//Get models
exports.getmodels = () => {
    return models;
};