"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.findUserByResetToken = exports.saveUser = exports.updateChangePassword = exports.removeRefreshToken = exports.findUserById = exports.updateRefreshToken = exports.createUser = exports.findUserByEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const findUserByEmail = async (email) => {
    return user_model_1.default.findOne({
        email
    }).select("+password");
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (data, session) => {
    const user = await user_model_1.default.create([data], { session });
    return user[0];
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
    return user_model_1.default.findById(id)
        .select("+password");
};
exports.findUserById = findUserById;
const removeRefreshToken = async (id) => {
    return user_model_1.default.findByIdAndUpdate(id, {
        refreshToken: null
    }, {
        new: true
    });
};
exports.removeRefreshToken = removeRefreshToken;
const updateChangePassword = async (userId, newPassword) => {
    return user_model_1.default.findByIdAndUpdate(userId, {
        password: newPassword,
        isFirstLogin: false
    }, {
        new: true
    });
};
exports.updateChangePassword = updateChangePassword;
const saveUser = async (user) => {
    return user.save();
};
exports.saveUser = saveUser;
const findUserByResetToken = async (hashedToken) => {
    return user_model_1.default.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: new Date()
        }
    }).select("+passwordResetToken");
};
exports.findUserByResetToken = findUserByResetToken;
const updatePassword = async (userId, hashedPassword) => {
    return user_model_1.default.findByIdAndUpdate(userId, {
        password: hashedPassword,
        passwordResetToken: undefined,
        passwordResetExpires: undefined
    }, {
        new: true
    });
};
exports.updatePassword = updatePassword;
