const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'dathang',
    {
      iddathang: {
        type: DataTypes.CHAR(20),
        allowNull: false,
        primaryKey: true,
      },
      makh: {
        type: DataTypes.CHAR(6),
        allowNull: false,
        references: {
          model: 'khachhang',
          key: 'MAKH',
        },
      },
      masach: {
        type: DataTypes.CHAR(6),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'sach',
          key: 'masach',
        },
      },
      SOLUONG: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      THOIGIAN: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      TRANGTHAI: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'dathang',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'iddathang' },
            { name: 'masach' },
            { name: 'TRANGTHAI' },
          ],
        },
        {
          name: 'makh',
          using: 'BTREE',
          fields: [{ name: 'makh' }],
        },
        {
          name: 'masach',
          using: 'BTREE',
          fields: [{ name: 'masach' }],
        },
      ],
    },
  );
};
