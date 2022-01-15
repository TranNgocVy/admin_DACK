const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tonkho', {
    masach: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'masach'
      }
    },
    NGAYTHANG: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    SLDau: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SLCuoi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Tongnhap: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Tongxuat: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tonkho',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "masach" },
          { name: "NGAYTHANG" },
        ]
      },
    ]
  });
};
