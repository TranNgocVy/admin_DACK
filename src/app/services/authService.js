const {
    models
} = require("../../config/db")
const {
    Op
} = require("sequelize");


exports.findUserAdmin = (username) => {
    return models.nhanvien.findOne({where :{ USER : username}})
}