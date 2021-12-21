const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ct_phieunhap', {
    MAPN: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'phieunhap',
        key: 'MAPN'
      }
    },
    MASACH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'masach'
      }
    },
    SL: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ct_phieunhap',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAPN" },
          { name: "MASACH" },
        ]
      },
      {
        name: "ct_phieunhap_MASACH_MAPN_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAPN" },
          { name: "MASACH" },
        ]
      },
      {
        name: "FK_CTPNHAP_SACH",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
