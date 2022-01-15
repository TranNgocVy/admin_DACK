const { models } = require('../../config/db');
const { Op } = require('sequelize');
const cloudImage = require('../../config/uploadIMG/cloudinary');
const bcrypt = require('bcrypt');
const randtoken = require("rand-token");
const mailService = require('../../config/mail/nodemailer')
// Get All customer account
exports.getCustomerAccount = () => {
  return models.khachhang.findAll({});
};
//Get one account
exports.getOneAccount = (username) => {
  return models.nhanvien.findOne({ where: { USER: username } });
};

//Get models
exports.getmodels = () => {
  return models;
};

exports.uploadImage = async (req, account) => {
  if (req.file) {
    var path = 'img/adminImg/' + account.MANV + '/';
    var result = await cloudImage.uploadIMG(req.file.path, path);
    req.body.HINHANH = result.secure_url;
    req.body.IDHINHANH = result.public_id;
    account.set(req.body);
    await account.save();
  }
};
exports.changePass = async (req) => {
  var NV = await models.nhanvien.findOne({
    where: {
      USER: req.user.USER,
    },
  });

  if (await bcrypt.compare(req.body.pass, NV.PASS)) {
    req.body.PASS = await bcrypt.hash(req.body.newpass, 10);
    await models.nhanvien.update(
      { PASS: req.body.PASS },
      { where: { USER: NV.USER } },
    );
    return 1;
  } else {
    return 0;
  }
};

exports.getMail = async (req) => {
  return await models.nhanvien.findOne({
    attributes: ["EMAIL", "MANV"],
    where: { USER: req.body.user },
  });
};

exports.sendEmail = async (email) => {
  if (!email) {
    return 0;
  }
  var token = randtoken.generate(20);
  var sent = await mailService.sendEmail(email.EMAIL, token);
  if (!sent) {
    await models.token_NV.create({
      MANV: email.MANV,
      TOKEN: token,
    });
  }
  return !sent;
};
exports.checktoken = async (token) => {
  var check = await models.token_NV.findOne({ where: { TOKEN: token } });
  await models.token_NV.destroy({
    where: {
      createdAt: {
        [Op.lt]: new Date(new Date() - 60 * 60 * 1000),
      },
    },
    force: true,
    paranoid: false,
  });
  if (!check) {
    return 0;
  }
  if (check.createdAt < new Date(new Date() - 20 * 60 * 1000)) {
    return 0;
  }
  return check
};

exports.resetPass = async (req) => {
  const user = await models.token_NV.findOne({ attributes: ["MANV"], token : req.body.token})
  if(!user){
    return 0
  }
  req.body.PASS = await bcrypt.hash(req.body.newpass,10) 
  var change = await models.nhanvien.update(
    {PASS: req.body.PASS},
    {where: {MANV: user.MANV}})
  if(!change){
    return 0
  }
  await models.token_NV.destroy({
    where: {
      token : req.body.token,
    },
    force: true,  
    paranoid: false,
  });
  return 1;
}