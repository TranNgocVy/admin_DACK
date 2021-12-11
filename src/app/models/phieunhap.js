const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'phieunhap',
    {
      MAPN: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      NGAYNHAP: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      MANXB: {
        type: DataTypes.STRING(6),
        allowNull: true,
        references: {
          model: 'nxb',
          key: 'manxb',
        },
      },
      MANV: {
        type: DataTypes.STRING(6),
        allowNull: true,
        references: {
          model: 'nhanvien',
          key: 'MANV',
        },
      },
    },
    {
      sequelize,
      tableName: 'phieunhap',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'MAPN' }],
        },
        {
          name: 'FK_PNHAP_NHANVIEN',
          using: 'BTREE',
          fields: [{ name: 'MANV' }],
        },
        {
          name: 'FK_PNHAP_NXB',
          using: 'BTREE',
          fields: [{ name: 'MANXB' }],
        },
      ],
    },
  );
};
