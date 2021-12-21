const { models } = require('../../config/db');
const { Op } = require('sequelize');
const cloudImage = require('../../config/uploadIMG/cloudinary');
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

exports.uploadImage = async(req, account) => {
    if (req.file) {
        var path = 'img/adminImg/' + account.MANV + '/';
        var result = await cloudImage.uploadIMG(req.file.path, path);
        req.body.HINHANH = result.secure_url;
        req.body.IDHINHANH = result.public_id;
        account.set(req.body);
        await account.save();
        // console.log(req.body);

    }
};