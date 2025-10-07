const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const User = sequelize.define('User', {
  full_name: {
    type: DataTypes.STRING,
    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cities',
      key: 'id',
    },
    
  },
}, {
  tableName: 'users',
  
});

module.exports = User;
