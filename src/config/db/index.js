const Sequelize = require('sequelize');

const initModels = require('../../app/models/init-models');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

module.exports = {
  sequelize,
  models: initModels(sequelize),
};
