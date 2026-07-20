"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChangePassword = exports.removeRefreshToken = exports.findUserById = exports.updateRefreshToken = exports.createUser = exports.findUserByEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const findUserByEmail = async (email) => {
    return user_model_1.default.findOne({
        email
    }).select("+password");
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (data) => {
    console.log(data);
    return user_model_1.default.create(data);
};
exports.createUser = createUser;
const updateRefreshToken = async (userId, refreshToken) => {
    return user_model_1.default.findByIdAndUpdate(userId, {
        refreshToken
    }, {
        new: true
    });
};
exports.updateRefreshToken = updateRefreshToken;
const findUserById = async (id) => {
    return await user_model_1.default.findById(id).select("+password");
};
exports.findUserById = findUserById;
const removeRefreshToken = async (id) => {
    return await user_model_1.default.findByIdAndUpdate(id, {
        refreshToken: null
    }, {
        new: true
    });
};
exports.removeRefreshToken = removeRefreshToken;
const updateChangePassword = async (userId, newPassword) => {
    return user_model_1.default.findByIdAndUpdate(userId, {
        password: newPassword
    }, {
        new: true
    });
};
exports.updateChangePassword = updateChangePassword;
