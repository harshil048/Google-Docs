"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareController = void 0;
const express_validator_1 = require("express-validator");
const catch_async_1 = __importDefault(require("../../../middleware/catch-async"));
const document_model_1 = require("../../../db/models/document.model");
const user_model_1 = require("../../../db/models/user.model");
const document_user_model_1 = require("../../../db/models/document-user.model");
const mail_service_1 = require("../../../services/mail.service");
class ShareController {
    constructor() {
        this.create = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const err = (0, express_validator_1.validationResult)(req);
            if (!err.isEmpty()) {
                return res.sendStatus(400).json(err);
            }
            const { id } = req.params;
            const document = yield document_model_1.Document.findByPk(id);
            if (!document)
                res.sendStatus(404);
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || (document === null || document === void 0 ? void 0 : document.userId) !== parseInt((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
                return res.sendStatus(400);
            }
            const { email, permission } = req.body;
            const sharedUser = yield user_model_1.User.findOne({
                where: {
                    email,
                },
            });
            if (!sharedUser)
                return res.sendStatus(400);
            const documentUser = yield document_user_model_1.DocumentUser.create({
                documentId: id,
                userId: sharedUser.id,
                permission: permission,
            });
            const mail = {
                from: "kuluruvineeth8623@gmail.com",
                to: sharedUser.email,
                subject: `${(_c = req.user) === null || _c === void 0 ? void 0 : _c.email} shared a document with you!`,
                text: `Click the follwing link to view and edit the document : http://localhost:3000/document/${id}`,
            };
            yield mail_service_1.mailservice.sendMail(mail);
            return res.status(201).json(documentUser);
        }));
        this.delete = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const err = (0, express_validator_1.validationResult)(req);
            if (!err.isEmpty())
                return res.sendStatus(400).json(err);
            const { documentId, userId } = req.params;
            const document = yield document_model_1.Document.findOne({
                where: {
                    id: documentId,
                    userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id,
                },
            });
            if (!document)
                return res.sendStatus(404);
            const query = {
                where: {
                    documentId,
                    userId,
                },
            };
            const documentUser = yield document_user_model_1.DocumentUser.findOne(query);
            if (!documentUser)
                return res.sendStatus(404);
            yield document_user_model_1.DocumentUser.destroy(query);
            return res.sendStatus(200);
        }));
    }
}
const shareController = new ShareController();
exports.shareController = shareController;
