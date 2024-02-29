import express, { Express, Request, Response } from "express";
import db from "./db/models";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
      "HEAD",
      "CONNECT",
    ],
  })
);
app.use(router);
app.use(errorHandler);

db.sequelize.sync();

export default app;
