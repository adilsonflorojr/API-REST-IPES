const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Photo = sequelize.define('Photo', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tree_id: {                 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'trees',
      key: 'id',
    }
  },
  user_id: {                  
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  photo_description: {        
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  record_date: {              
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'photos',
  timestamps: false, 
});

module.exports = Photo;
