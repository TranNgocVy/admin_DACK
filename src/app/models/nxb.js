const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'nxb',
    {
      manxb: {
        type: DataTypes.STRING(6),
        allowNull: false,
        primaryKey: true,
      },
      Ten: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      diachi: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      std: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'nxb',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'manxb' }],
        },
      ],
    },
  );
};
