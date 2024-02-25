import { Sequelize } from "sequelize-typescript";
import env from "./env.config";

const sequelize =
  env.NODE_ENV === "test" || env.NODE_ENV === "development"
    ? new Sequelize(env.DATABASE, env.USER, env.PASSWORD, {
        host: "localhost",
        dialect: "postgres",
        logging: false,
      })
    : new Sequelize(env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
          ssl: false,
        },
        logging: false,
      });

export default sequelize;
