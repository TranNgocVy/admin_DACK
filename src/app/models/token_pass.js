const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'token_pass',
    {
      MAKH: {
        type: DataTypes.STRING(6),
        allowNull: false,
        references: {
          model: 'khachhang',
          key: 'MAKH',
        },
      },
      TOKEN: {
        type: DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'token_pass',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'TOKEN' }],
        },
        {
          name: 'token_pass_khachhang_MAKH_fk',
          using: 'BTREE',
          fields: [{ name: 'MAKH' }],
        },
      ],
    },
  );
};
