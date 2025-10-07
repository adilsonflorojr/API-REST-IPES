
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Block = sequelize.define('Block', { 
  block_reason: {         
    type: DataTypes.TEXT,
    allowNull: true,
  },
  block_date: {            
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ativo',  
  },
  user_id: {              
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  blocked_user_id: {       
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'blocks',
  timestamps: false,
});

module.exports = Block;
