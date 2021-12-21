const { models } = require('../../config/db');
const { Op } = require('sequelize');

//Get models
exports.getmodels = () => {
    return models;
};
//get NXB
exports.getNXBs = async () => {
    return await models.nxb.findAll({raw : true});
}
//get sach from NXB
exports.getSachNXBs = async (NXB) => {
    return await models.sach.findAll({
        where: {
            manxb : NXB 
        },
        raw : true
    })
}