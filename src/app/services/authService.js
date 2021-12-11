const { models } = require('../../config/db');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
exports.findUserAdmin = (username) => {
  return models.nhanvien.findOne({ where: { USER: username } });
};
exports.getAdmin = () => {
  return models.nhanvien;
};
exports.checkUSER = async (id) => {
  return await models.nhanvien
    .count({
      where: {
        USER: id,
      },
    })
    .then((count) => {
      console.log(count);
      if (count != 0) {
        return true;
      } else return false;
    });
};
exports.genIDNV = async () => {
  var Nhanvien = await models.nhanvien.findAll({});
  var i = 1;
  var check = true;
  var str;
  var Hinhthuc = 'NV';
  while (true) {
    check = true;
    str = '' + i;
    while (str.length < 4) {
      str = 0 + str;
    }
    s_key = Hinhthuc + str;
    for (let index = 0; index < Nhanvien.length; index++) {
      if (Nhanvien[index]['MANV'] === s_key) {
        check = false;
        break;
      }
    }
    if (check) {
      return s_key;
    }
    i++;
  }
};
exports.hashPassword = (pass) => {
  return bcrypt.hash(pass, 10);
};
// process upload img
