"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./db/models"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://google-docs-backend.vercel.app/",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(routes_1.default);
app.use(errorHandler_1.default);
models_1.default.sequelize.sync();
exports.default = app;
