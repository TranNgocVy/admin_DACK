const { models } = require('../../config/db');
const { Op } = require('sequelize');
const cloudImage = require('../../config/uploadIMG/cloudinary');
// support query database
exports.getmodels = () => {
    return models;
};

//Get all publisher
exports.AllNXB = () => {
    return models.nxb.findAll({});
};

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
            },
        },
    });
};

//Get all books from stock
exports.getStock = (title) => {
    var condition = '';
    if (title) {
        condition = title;
    }
    return models.tonkho.findAll({
        include: [{
            model: models.sach,
            as: 'masach_sach',
            where: {
                tensach: {
                    [Op.like]: '%' + condition + '%',
                },
            },
        }, ],
    });
};

// Check id exists
exports.isIdUnique = async(id) => {
    return await models.sach
        .count({
            where: {
                masach: id,
            },
        })
        .then((count) => {
            if (count != 0) {
                return false;
            } else return true;
        });
};

//Automatic create book
exports.genKeybook = async(Hinhthuc) => {
        var s_key = Hinhthuc;
        var books = await models.sach.findAll({ paranoid: false, });
        var i = 1;
        var check = true;
        var str;
        while (true) {
            check = true;
            str = '' + i;
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
            i++;
        }
    }
    //Get one book
exports.getOnebook = (MSach) => {
    return models.sach.findOne({
        where: {
            masach: MSach
        }
    });
};

//create book
exports.createBook = async(req) => {
    req.body.HINHANH = ""
    if (req.file) {
        var path = 'img/books/' + req.body.masach + '/';
        var result = await cloudImage.uploadIMG(req.file.path, path);
        req.body.HINHANH = result.secure_url;
        req.body.IDHINHANH = result.public_id;
    }
    const book = await models.sach.create({
        masach: req.body.masach,
        tensach: req.body.tensach,
        tacgia: req.body.tacgia,
        MOTA: req.body.MOTA,
        manxb: req.body.manxb,
        ngayXB: req.body.ngayXB,
        gia: req.body.gia,
        SL: 0,
        HINHANH: req.body.HINHANH,
        IDHINHANH: req.body.IDHINHANH,
    });

    if (req.body.category) {
        for (const element of req.body.category) {
            await models.theloaicuasach.create({
                masach: req.body.masach,
                maTL: element,
            });
        }
    }
    return book;
};
//delete book
exports.DeleteBook = async(req) => {
    return await models.sach.destroy({
        where: {
            masach: req.params.id
        }
    });
};
//update book
exports.updateBook = async(req) => {
    var book = await models.sach.findOne({
        where: {
            masach: req.params.id
        }
    });
    if (req.file) {
        var path = 'img/books/' + book.masach;
        if (book.IDHINHANH) {
            await cloudImage.deleteIMG(book.IDHINHANH)
        }
        var result = await cloudImage.uploadIMG(req.file.path, path);
        req.body.HINHANH = result.secure_url;
        req.body.IDHINHANH = result.public_id;

    }

    book.set(req.body);
    await book.save();
};
// count delete book
exports.countDeleteBook = async() => {
    return await models.sach.count({
        where: {
            deletedAt: {
                [Op.ne]: null,
            },
        },
        paranoid: false,
    });
};
//get list deleted from
exports.getlistdeletedBook = async() => {
    return await models.sach.findAll({
        where: {
            deletedAt: {
                [Op.ne]: null,
            },
        },
        paranoid: false,
    });
};
//restore book from trash
exports.restorebook = async(req) => {
    return await models.sach.restore({
        where: {
            masach: req.params.id,
        },
    });
};
//delete book force
exports.deletBookForce = async(req) => {
    var book = await models.sach.findOne({
        where: {
            masach: req.params.id
        },
        paranoid: false
    });
    if (book.IDHINHANH) {
        await cloudImage.deleteIMG(book.IDHINHANH);
    }

    return await models.sach.destroy({
        where: {
            masach: req.params.id,
        },
        force: true,
    });
};

//Get models
exports.getmodels = () => {
    return models;
};