const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");

const taskModel = sequelize.define("Task", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    title: { 
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { taskModel };
