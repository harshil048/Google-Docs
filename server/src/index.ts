import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import env from "./config/env.config";
import db from "./db/models";
import router from "./routes";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(router);
app.use(errorHandler);

db.sequelize.sync();

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

export default app;
