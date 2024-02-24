"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentValidator = void 0;
const express_validator_1 = require("express-validator");
class DocumentValidator {
    constructor() {
        this.update = [
            (0, express_validator_1.body)("title")
                .optional()
                .isLength({ min: 0, max: 25 })
                .withMessage("Title must between 0-25 characters"),
            // body("content")
            //   .optional()
            //   .custom((value) => {
            //     try {
            //       JSON.parse(value);
            //     } catch (error) {
            //       console.log(error);
            //       throw new Error("Invalid document content");
            //     }
            //   }),
            (0, express_validator_1.body)("isPublic")
                .optional()
                .isBoolean()
                .withMessage("Must Provide true or false"),
        ];
    }
}
const documentValidator = new DocumentValidator();
exports.documentValidator = documentValidator;
