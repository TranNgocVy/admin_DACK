const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nhanvien', {
    MANV: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    USER: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "USER"
    },
    PASS: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    HOTEN: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    NGAYSINH: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HINHANH: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    CCCD: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    PHAI: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    DIACHI: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    SDT: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    LOAINV: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    ATUPDATED: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ATDELETED: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ATCREATED: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IDHINHANH: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nhanvien',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
      {
        name: "USER",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER" },
        ]
      },
    ]
  });
};
