"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareValidator = void 0;
const express_validator_1 = require("express-validator");
const permission_enum_1 = __importDefault(require("../types/enums/permission-enum"));
class ShareValidator {
    constructor() {
        this.create = [
            (0, express_validator_1.body)("email")
                .isEmail()
                .normalizeEmail()
                .withMessage("Must provid a valid email"),
            (0, express_validator_1.body)("permission").custom((value) => {
                if (!Object.values(permission_enum_1.default).includes(value)) {
                    throw new Error("Must provid valid document permission");
                }
                else
                    return true;
            }),
        ];
    }
}
const shareValidator = new ShareValidator();
exports.shareValidator = shareValidator;
