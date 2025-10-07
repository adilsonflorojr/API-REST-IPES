const sequelize = require('../configs/db');
const associateModels = require('../models/associateModels');

const syncModels = async () => {
  try {
    associateModels();
    await sequelize.sync();
    console.log('Tabelas sincronizadas!');
  } catch (error) {
    console.error('Erro ao sincronizar:', error);
  }
};

module.exports = syncModels;