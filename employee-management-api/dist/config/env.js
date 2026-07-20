"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} is missing`);
    }
    return value;
};
exports.ENV = {
    PORT: Number(process.env.PORT) || 5000,
    MONGO_URI: getEnv("MONGO_URI"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN"),
    REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
    REFRESH_TOKEN_EXPIRES_IN: getEnv("REFRESH_TOKEN_EXPIRES_IN")
};
