const {
    models
} = require("../../config/db")
const {
    Op
} = require("sequelize");


exports.findUserAdmin = (username) => {
    return models.nhanvien.findAll({where :{ USER : username}})
}