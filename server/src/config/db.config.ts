import { Sequelize } from "sequelize-typescript";
import env from "./env.config";

const sequelize =
  env.NODE_ENV === "test" || env.NODE_ENV === "development"
    ? new Sequelize("gd", "postgres", "Harshil@123", {
        host: "localhost",
        dialect: "postgres",
        logging: false,
      })
    : new Sequelize("postgres://postgres:Harshil@123@localhost:5432/gd", {
        dialect: "postgres",
        dialectOptions: {
          ssl: false
        },
        logging: false,
      });

export default sequelize;
