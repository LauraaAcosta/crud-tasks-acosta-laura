import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const taskModel = sequelize.define("Task", {
  tittle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    }, 
});