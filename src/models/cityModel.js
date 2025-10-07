const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");


const City = sequelize.define("City",
  {
    city_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  },
  {
    tableName: "cities",
    
  }
);

module.exports = City;
