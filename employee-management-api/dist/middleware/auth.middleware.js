"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const user_respository_1 = require("../repositories/user.respository");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError_1.AppError("Access token is required", 401);
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        const user = await (0, user_respository_1.findUserById)(decoded.id.toString());
        if (!user) {
            throw new AppError_1.AppError("User not found", 401);
        }
        if (!user.isActive) {
            throw new AppError_1.AppError("Your account has been disabled", 403);
        }
        req.user = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new AppError_1.AppError("Access token expired", 401));
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new AppError_1.AppError("Invalid access token", 401));
        }
        return next(error);
    }
};
exports.authenticate = authenticate;
