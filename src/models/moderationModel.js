const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Moderation = sequelize.define('Moderation', {
  error_comment: {          
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status_marking: {          
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendente',  
  },
  date: {                  
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  user_id: {                
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  tree_id: {               
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'trees',
      key: 'id',
    },
  },
  city_id: {                 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cities',
      key: 'id',
    },
  }
}, {
  tableName: 'moderations',
  timestamps: false,
});

module.exports = Moderation;
