import express, { Express, Request, Response } from "express";
import db from "./db/models";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();
app.use(express.json());

app.use(router);
app.use(errorHandler);

db.sequelize.sync();

export default app;
