const {
    models
} = require("../../config/db")
// support query database
exports.oneAd = () => {
    return models.nhanvien.findAll({});
}
exports.AllNXB = () => {
    return models.nxb.findAll({});
}
exports.getsachs = () => {
    return models.sach;
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
    return s_key;
}