"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, "access_token", (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        try {
            const { id, email, roles } = decoded;
            req.user = { id, email, roles };
            next();
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(403);
        }
    });
};
exports.authenticate = authenticate;
