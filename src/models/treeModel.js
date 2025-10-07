const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Tree = sequelize.define('Tree', {
  coordinates: {              
    type: DataTypes.STRING,
  },
  street: {                
    type: DataTypes.STRING,
  },
  reference_point: {         
    type: DataTypes.STRING,
  },
  flower_color: {           
    type: DataTypes.STRING,
  },
  tree_size: {               
    type: DataTypes.STRING,
  },
  age: {                   
    type: DataTypes.INTEGER,
  },
  comment: {              
    type: DataTypes.TEXT,
  },
  view_count: {             
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  
  qr_code_url: {             
    type: DataTypes.STRING,
  },
  user_id: {                
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
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
  tableName: 'trees',
  timestamps: false,
});

module.exports = Tree;
