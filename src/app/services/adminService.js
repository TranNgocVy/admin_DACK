const {
    models
} = require("../../config/db")
const {
    Op
} = require("sequelize");

// support query database

//Get all publisher
exports.AllNXB = () => {
    return models.nxb.findAll({});
}

// Get all books
exports.getBooks = (title) => {
    var condition = '';
    if (title) {
        condition = title;
    }
    return models.sach.findAll({
        where: {
            tensach: {
                [Op.like]: '%' + condition + '%',
            }
        }
    })
}


//Get all books from stock
exports.getStock = (title) => {
    var condition = '';
    if (title) {
        condition = title;
    }
    return models.tonkho.findAll({
        include: [{
            model: models.sach,
            as: "masach_sach",
            where: {
                tensach: {
                    [Op.like]: '%' + condition + '%'
                }
            }
        }]
    })
}

// Get All admin account
exports.getAdminAccount = () => {
    return models.nhanvien.findAll({});
}

// Get All customer account
exports.getCustomerAccount = () => {
    return models.khachhang.findAll({});
}

//Get models
exports.getmodels = () => {
    return models;
}

// Check id exists
exports.isIdUnique = async(id) => {
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

//Automatic create book
exports.genKeybook = async(Hinhthuc) => {
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

//Get one book
exports.getOnebook = (MSach) => {
    return models.sach.findOne({ where: { masach: MSach } })
}


//Get one account
exports.getOneAccount = (username) => {
    return models.nhanvien.findOne({ where: { USER: username } })
}