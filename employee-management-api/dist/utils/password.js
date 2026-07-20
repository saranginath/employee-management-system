"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashedpassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashedpassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(password, salt);
};
exports.hashedpassword = hashedpassword;
const comparePassword = async (password, hashpassword) => {
    return bcrypt_1.default.compare(password, hashpassword);
};
exports.comparePassword = comparePassword;
