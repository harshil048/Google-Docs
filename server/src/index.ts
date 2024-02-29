import express, { Express, Request, Response } from "express";
import db from "./db/models";
import router from "./routes";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://google-docs-smoky-one.vercel.app",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(router);
app.use(errorHandler);

db.sequelize.sync();

export default app;
