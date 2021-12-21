const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('binhluan', {
    USER: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'khachhang',
        key: 'USER'
      }
    },
    MASACH: {
      type: DataTypes.CHAR(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'masach'
      }
    },
    THOIGIAN: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    NOIDUNG: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'binhluan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER" },
          { name: "MASACH" },
          { name: "THOIGIAN" },
        ]
      },
      {
        name: "binhluan_sach_masach_fk",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
