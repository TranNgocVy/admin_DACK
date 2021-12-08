module.exports = {
  multipleSequelizeToObject: function (sequelizeArray) {
    return sequelizeArray.map((sequelizeArray) => sequelizeArray.toJSON());
  },

  SequelizeToObject: function (sequelize) {
    return sequelize ? sequelize.toJSON() : sequelize;
  },
};
