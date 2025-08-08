import { Sequelize } from "sequelize";
import dotenv from "dotenv"; 

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
  }
);

export const start_Database = async () => {
    try {
        await sequelize.authenticate();
        console.log("La conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
    }