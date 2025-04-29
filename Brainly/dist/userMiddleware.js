"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({
            message: "No token provided",
        });
    }
    else {
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwt_secret);
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.userId;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not logged in",
            });
        }
    }
};
exports.userMiddleware = userMiddleware;
