import express, { Express, Request, Response } from "express";
import db from "./db/models";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://google-docs-frontend-steel.vercel.app",
    methods: "*",
  })
);
app.use(router);
app.use(errorHandler);

db.sequelize.sync();

export default app;
