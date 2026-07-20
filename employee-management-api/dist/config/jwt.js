"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veritfyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.ENV.JWT_SECRET, {
        expiresIn: env_1.ENV.JWT_EXPIRES_IN,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: env_1.ENV.REFRESH_TOKEN_EXPIRES_IN
    });
};
exports.generateRefreshToken = generateRefreshToken;
const veritfyRefreshToken = (token) => jsonwebtoken_1.default.verify(token, env_1.ENV.REFRESH_TOKEN_SECRET);
exports.veritfyRefreshToken = veritfyRefreshToken;
