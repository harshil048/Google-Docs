"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env_config_1 = __importDefault(require("./env.config"));
const sequelize = env_config_1.default.NODE_ENV === "test" || env_config_1.default.NODE_ENV === "development"
    ? new sequelize_typescript_1.Sequelize(env_config_1.default.DATABASE, env_config_1.default.USER, env_config_1.default.PASSWORD, {
        host: "localhost",
        dialect: "postgres",
        logging: false,
    })
    : new sequelize_typescript_1.Sequelize(env_config_1.default.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: false,
        },
        logging: false,
    });
exports.default = sequelize;
