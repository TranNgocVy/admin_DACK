const {
    models
} = require("../../config/db")
const {
    Op
  } = require("sequelize");
  
// support query database
exports.oneAd = () => {
    return models.nhanvien.findAll({});
}
exports.AllNXB = () => {
    return models.nxb.findAll({});
}

//Lấy toàn bộ sách trong Database
exports.getBooks = (title) => {
    var condition = '';
    if(title){
        condition = title;
    }
    return models.sach.findAll({
        where:{
            tensach:{
                [Op.like]: '%'+condition+'%',
            }
        }
    })
}


//Lấy thông tin sách còn tồn trong kho
exports.getStock = (title) => {
    var condition = '';
    if(title){
        condition = title;
    }
    return models.tonkho.findAll({
        include:[{
            model: models.sach,
            as: "masach_sach",
            where:{
                tensach:{
                    [Op.like]: '%' + condition+ '%'
                }
            }
        }]
    })
}


exports.getmodels = () => {
    return models;
}

exports.isIdUnique = async (id) => {
    return await models.sach.count({
        where: {
            masach: id
        }
    })
        .then(count => {
            console.log(count);
            if (count != 0) {
                return false;
            } else
                return true;
        });
}

exports.genKeybook = async (Hinhthuc) => {
    var s_key = Hinhthuc;
    var books = await models.sach.findAll({})
    var i = 1
    var check = true;
    var str
    while (true) {
        check = true;
        str = "" + i;
        while (str.length < 4) {
            str = 0 + str;
        }
        s_key = Hinhthuc + str;
        for (let index = 0; index < books.length; index++) {
            if (books[index]['masach'] === s_key) {
                check = false;
                break;
            }
        }
        if (check) {
            return s_key;
        }
        i++
    }
}