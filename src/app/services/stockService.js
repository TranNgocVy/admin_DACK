const { models, sequelize } = require('../../config/db');
const { Op } = require('sequelize');
//Get books from stock has title as "title" in month "month"
exports.getStock = (title, month) => {
  var tit = '';
  if (title) {
    tit = title;
  }

  var m = month.replace('-', '');

  return models.tonkho.findAll({
    where: {
      NGAYTHANG: {
        [Op.like]: m,
      },
    },
    include: [
      {
        model: models.sach,
        as: 'masach_sach',
        where: {
          tensach: {
            [Op.like]: '%' + tit + '%',
          },
        },
      },
    ],
  });
};

exports.updateStock = async (month) => {
  
  var year = Number(month.slice(0,4));

  var oldMonth = Number(month.slice(-2)) - 1;
  
  if(oldMonth == 0){
    oldMonth = 12;
    year -= 1;
  }

  var oldDate = year.toString() + oldMonth.toString();
  var currentDate = month.replace('-', '');

  var book = await sequelize.query(
    "SELECT * FROM `tonkho` AS `tonkho` " +
    "WHERE `tonkho`.`NGAYTHANG` = '" + oldDate + "' AND NOT EXISTS " +
    "(SELECT * FROM  `tonkho` AS `tonkho1` " + 
    "WHERE `tonkho1`.`NGAYTHANG` = '" + currentDate + "' AND `tonkho1`.`masach` = `tonkho`.`masach` )"
  )

  book = book[0]
  for(var i = 0 ; i< book.length; i++)
  {
    await models.tonkho.create({
      masach: book[i].masach,
      NGAYTHANG: currentDate,
      SLDau: book[i].SLCuoi,
      SLCuoi: book[i].SLCuoi,
      Tongnhap: 0,
      Tongxuat: 0,
    });
  }
}

//Get models
exports.getmodels = () => {
  return models;
};
