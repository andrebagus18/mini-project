import { Sequelize } from "sequelize";
import dbConfig from "./database.js";
const config = dbConfig["development"];

const sequelize = new Sequelize(
  config.connection.database,
  config.connection.user,
  config.connection.password,
  {
    host: config.connection.host,
    dialect: "postgres",
  },
);

export default sequelize;
