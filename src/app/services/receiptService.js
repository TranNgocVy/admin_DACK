const { models, sequelize } = require('../../config/db');
const { Op } = require('sequelize');

//Get models
exports.getmodels = () => {
  return models;
};

//Get all receipt has id like "id"
exports.getReceipt = (search) => {
  var id = '';
  if (search) {
    id = search;
  }

  return sequelize.query(
    'SELECT * FROM `phieumua` AS `phieumua` INNER JOIN `khachhang` AS `MAKH_khachhang` ' +
      'ON `phieumua`.`MAKH` = `MAKH_khachhang`.`MAKH` ' +
      "WHERE `phieumua`.`MAPM` LIKE '%" +
      id +
      "%' OR `MAKH_khachhang`.`HOTEN` LIKE '%" +
      id +
      "%'",
  );
};

//Get one receipt has id like "id"
exports.getOneReceipt = (receiptId) => {
  var id = '';
  if (receiptId) {
    id = receiptId;
  }

  return models.phieumua.findOne({
    where: {
      MAPM: {
        [Op.like]: id,
      },
    },
    include: [
      {
        model: models.khachhang,
        as: 'MAKH_khachhang',
      },
    ],
  });
};

//Get detail receipt has id as "id"
exports.getDetailReceipt = (receiptId) => {
  var id = '';
  if (receiptId) {
    id = receiptId;
  }

  return models.ct_phieumua.findAll({
    where: {
      MAPM: {
        [Op.like]: id,
      },
    },
    include: [
      {
        model: models.sach,
        as: 'MASACH_sach',
      },
    ],
  });
};
