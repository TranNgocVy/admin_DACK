const { models } = require('../../config/db');
const { Op } = require('sequelize');

//Get one publisher
exports.getOnepublisher = (username) => {
  return models.nhanvien.findOne({ where: { USER: username } });
};

// Get All admin publisher
exports.getPublisher = () => {
  return models.nxb.findAll({});
};

// Get All customer publisher
exports.getCustomerpublisher = () => {
  return models.khachhang.findAll({});
};

//Get models
exports.getmodels = () => {
  return models;
};

async function genKeyNXB(Hinhthuc) {
  var s_key = Hinhthuc;
  var NXB = await models.nxb.findAll({});
  var i = 1;
  var check = true;
  var str;
  while (true) {
    check = true;
    str = '' + i;
    while (str.length < 3) {
      str = 0 + str;
    }
    s_key = Hinhthuc + str;
    for (let index = 0; index < NXB.length; index++) {
      if (NXB[index]['manxb'] === s_key) {
        check = false;
        break;
      }
    }
    if (check) {
      return s_key;
    }
    i++;
  }
}

exports.addPublisher = async (req) => {
  req.body.manxb = await genKeyNXB('NXB');
  console.log(req.body);
  return await models.nxb.create({
    manxb: req.body.manxb,
    Ten: req.body.Ten,
    std: req.body.std,
    diachi: req.body.diachi,
    email: req.body.email,
  });
};
