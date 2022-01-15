const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phieumua', {
    MAPM: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    NGAYMUA: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    MAKH: {
      type: DataTypes.STRING(6),
      allowNull: true,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    }
  }, {
    sequelize,
    tableName: 'phieumua',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAPM" },
        ]
      },
      {
        name: "FK_PMUA_KHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
    ]
  });
};
