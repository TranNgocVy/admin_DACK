const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('token_NV', {
    MANV: {
      type: DataTypes.STRING(6),
      allowNull: true,
      references: {
        model: 'nhanvien',
        key: 'MANV'
      }
    },
    TOKEN: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'token_NV',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TOKEN" },
        ]
      },
      {
        name: "token_NV_nhanvien_MANV_fk",
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
    ]
  });
};
