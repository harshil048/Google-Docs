"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./db/models"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
const port = 8080;
models_1.default.sequelize.sync();
// app.get("/", (req: Request, res: Response) => {
//   res.send("Expresssdasd");
// });
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
