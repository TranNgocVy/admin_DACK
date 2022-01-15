const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nxb', {
    manxb: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    Ten: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "nxb_Ten_uindex"
    },
    diachi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sdt: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nxb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "manxb" },
        ]
      },
      {
        name: "nxb_Ten_uindex",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ten" },
        ]
      },
    ]
  });
};
