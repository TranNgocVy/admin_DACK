var DataTypes = require('sequelize').DataTypes;
var _binhluan = require('./binhluan');
var _ct_phieumua = require('./ct_phieumua');
var _ct_phieunhap = require('./ct_phieunhap');
var _dathang = require('./dathang');
var _khachhang = require('./khachhang');
var _nhanvien = require('./nhanvien');
var _nxb = require('./nxb');
var _phieumua = require('./phieumua');
var _phieunhap = require('./phieunhap');
var _sach = require('./sach');
var _theloai = require('./theloai');
var _theloaicuasach = require('./theloaicuasach');
var _token_pass = require('./token_pass');
var _tonkho = require('./tonkho');

function initModels(sequelize) {
  var binhluan = _binhluan(sequelize, DataTypes);
  var ct_phieumua = _ct_phieumua(sequelize, DataTypes);
  var ct_phieunhap = _ct_phieunhap(sequelize, DataTypes);
  var dathang = _dathang(sequelize, DataTypes);
  var khachhang = _khachhang(sequelize, DataTypes);
  var nhanvien = _nhanvien(sequelize, DataTypes);
  var nxb = _nxb(sequelize, DataTypes);
  var phieumua = _phieumua(sequelize, DataTypes);
  var phieunhap = _phieunhap(sequelize, DataTypes);
  var sach = _sach(sequelize, DataTypes);
  var theloai = _theloai(sequelize, DataTypes);
  var theloaicuasach = _theloaicuasach(sequelize, DataTypes);
  var token_pass = _token_pass(sequelize, DataTypes);
  var tonkho = _tonkho(sequelize, DataTypes);

  khachhang.belongsToMany(sach, {
    as: 'MASACH_saches',
    through: binhluan,
    foreignKey: 'USER',
    otherKey: 'MASACH',
  });
  phieumua.belongsToMany(sach, {
    as: 'MASACH_sach_ct_phieumuas',
    through: ct_phieumua,
    foreignKey: 'MAPM',
    otherKey: 'MASACH',
  });
  phieunhap.belongsToMany(sach, {
    as: 'MASACH_sach_ct_phieunhaps',
    through: ct_phieunhap,
    foreignKey: 'MAPN',
    otherKey: 'MASACH',
  });
  sach.belongsToMany(khachhang, {
    as: 'USER_khachhangs',
    through: binhluan,
    foreignKey: 'MASACH',
    otherKey: 'USER',
  });
  sach.belongsToMany(phieumua, {
    as: 'MAPM_phieumuas',
    through: ct_phieumua,
    foreignKey: 'MASACH',
    otherKey: 'MAPM',
  });
  sach.belongsToMany(phieunhap, {
    as: 'MAPN_phieunhaps',
    through: ct_phieunhap,
    foreignKey: 'MASACH',
    otherKey: 'MAPN',
  });
  sach.belongsToMany(theloai, {
    as: 'maTL_theloais',
    through: theloaicuasach,
    foreignKey: 'masach',
    otherKey: 'maTL',
  });
  theloai.belongsToMany(sach, {
    as: 'masach_saches',
    through: theloaicuasach,
    foreignKey: 'maTL',
    otherKey: 'masach',
  });
  binhluan.belongsTo(khachhang, { as: 'USER_khachhang', foreignKey: 'USER' });
  khachhang.hasMany(binhluan, { as: 'binhluans', foreignKey: 'USER' });
  dathang.belongsTo(khachhang, { as: 'makh_khachhang', foreignKey: 'makh' });
  khachhang.hasMany(dathang, { as: 'dathangs', foreignKey: 'makh' });
  phieumua.belongsTo(khachhang, { as: 'MAKH_khachhang', foreignKey: 'MAKH' });
  khachhang.hasMany(phieumua, { as: 'phieumuas', foreignKey: 'MAKH' });
  token_pass.belongsTo(khachhang, { as: 'MAKH_khachhang', foreignKey: 'MAKH' });
  khachhang.hasMany(token_pass, { as: 'token_passes', foreignKey: 'MAKH' });
  phieunhap.belongsTo(nhanvien, { as: 'MANV_nhanvien', foreignKey: 'MANV' });
  nhanvien.hasMany(phieunhap, { as: 'phieunhaps', foreignKey: 'MANV' });
  phieunhap.belongsTo(nxb, { as: 'MANXB_nxb', foreignKey: 'MANXB' });
  nxb.hasMany(phieunhap, { as: 'phieunhaps', foreignKey: 'MANXB' });
  sach.belongsTo(nxb, { as: 'manxb_nxb', foreignKey: 'manxb' });
  nxb.hasMany(sach, { as: 'saches', foreignKey: 'manxb' });
  ct_phieumua.belongsTo(phieumua, { as: 'MAPM_phieumua', foreignKey: 'MAPM' });
  phieumua.hasMany(ct_phieumua, { as: 'ct_phieumuas', foreignKey: 'MAPM' });
  ct_phieunhap.belongsTo(phieunhap, {
    as: 'MAPN_phieunhap',
    foreignKey: 'MAPN',
  });
  phieunhap.hasMany(ct_phieunhap, { as: 'ct_phieunhaps', foreignKey: 'MAPN' });
  binhluan.belongsTo(sach, { as: 'MASACH_sach', foreignKey: 'MASACH' });
  sach.hasMany(binhluan, { as: 'binhluans', foreignKey: 'MASACH' });
  ct_phieumua.belongsTo(sach, { as: 'MASACH_sach', foreignKey: 'MASACH' });
  sach.hasMany(ct_phieumua, { as: 'ct_phieumuas', foreignKey: 'MASACH' });
  ct_phieunhap.belongsTo(sach, { as: 'MASACH_sach', foreignKey: 'MASACH' });
  sach.hasMany(ct_phieunhap, { as: 'ct_phieunhaps', foreignKey: 'MASACH' });
  dathang.belongsTo(sach, { as: 'masach_sach', foreignKey: 'masach' });
  sach.hasMany(dathang, { as: 'dathangs', foreignKey: 'masach' });
  theloaicuasach.belongsTo(sach, { as: 'masach_sach', foreignKey: 'masach' });
  sach.hasMany(theloaicuasach, {
    as: 'theloaicuasaches',
    foreignKey: 'masach',
  });
  tonkho.belongsTo(sach, { as: 'masach_sach', foreignKey: 'masach' });
  sach.hasMany(tonkho, { as: 'tonkhos', foreignKey: 'masach' });
  theloaicuasach.belongsTo(theloai, { as: 'maTL_theloai', foreignKey: 'maTL' });
  theloai.hasMany(theloaicuasach, {
    as: 'theloaicuasaches',
    foreignKey: 'maTL',
  });

  return {
    binhluan,
    ct_phieumua,
    ct_phieunhap,
    dathang,
    khachhang,
    nhanvien,
    nxb,
    phieumua,
    phieunhap,
    sach,
    theloai,
    theloaicuasach,
    token_pass,
    tonkho,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
