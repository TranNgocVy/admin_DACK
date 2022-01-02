const { models } = require('../../config/db');
const { Op } = require('sequelize');

//get 1 NXB
exports.getOneNXB = async (nxb) => {
  return await models.nxb.findOne({
    where: {
      manxb: nxb,
    },
    raw: true,
  });
};

//get sach from NXB
exports.getSachNXBs = async (NXB) => {
  return await models.sach.findAll({
    where: {
      manxb: NXB,
    },
    raw: true,
  });
};

//get sach base on 'name' and 'pulisher'
exports.getBookNameNXB = async (name, pulisher) => {
    return await models.sach.findOne({
        where: {
            manxb: pulisher,
            tensach: {
                [Op.like]: name
            }
        },
        raw: true
    })
}

//Lấy mã phiếu nhập
exports.genKeyOrder = async () => {
  const order = await models.phieunhap.findAll({});
  var i = 0;
  for (i = 0; i < order.length; i++) {
    const id = Number(order[i]['MAPN'].substring(2, order[i]['MAPN'].length));
    if (i + 1 != id) {
      break;
    }
  }

  var mapn = '' + (i + 1);
  while (mapn.length < 3) {
    mapn = '0' + mapn;
  }

  mapn = 'PN' + mapn;

  return mapn;
};

//Tạo 1 phiếu nhập mới
exports.createOrder = async (mapn, publisher, manv) => {
  const d = new Date();
  var ngaynhap = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  const order = await models.phieunhap.create({
    MAPN: mapn,
    MANXB: publisher,
    NGAYNHAP: ngaynhap,
    MANV: manv,
  });
  return true;
};
//Tạo các chi tiết phiếu nhập
exports.createDetailOrder = async (mapn,idList,quantityList) => {
    for(var i = 0; i < idList.length; i++){
        await models.ct_phieunhap.create({
            MAPN: mapn,
            MASACH: idList[i],
            SL: parseInt(quantityList[i]),
        });
    }
    return true;
}

//Cập nhật trạng thái của tài khoản khách hàng
exports.updateStatusCustomer = (makh, status) => {
  if (status == 'lock') {
    return models.khachhang.restore({
      where: {
        MAKH: {
          [Op.like]: makh,
        },
      },
    });
  } else {
    return models.khachhang.destroy({
      where: {
        MAKH: {
          [Op.like]: makh,
        },
      },
    });
  }
};
