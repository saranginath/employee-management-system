"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changepasswordService = exports.logoutUser = exports.refreshAccessToken = exports.loginUser = exports.registerUser = void 0;
const user_respository_1 = require("../repositories/user.respository");
const AppError_1 = require("../utils/AppError");
const password_1 = require("../utils/password");
const jwt_1 = require("../config/jwt");
const registerUser = async (data) => {
    const existingUser = await (0, user_respository_1.findUserByEmail)(data.email);
    if (existingUser) {
        throw new AppError_1.AppError("Email already exists", 400);
    }
    const hashedPassword = await (0, password_1.hashedpassword)(data.password);
    const user = await (0, user_respository_1.createUser)({
        ...data, password: hashedPassword
    });
    const { password, ...userResponse } = user.toObject();
    return userResponse;
};
exports.registerUser = registerUser;
const loginUser = async (data) => {
    const user = await (0, user_respository_1.findUserByEmail)(data.email);
    console.log(user);
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    if (!user?.isEmailVerified) {
        throw new AppError_1.AppError("Please verify your mail before logging", 403);
    }
    if (!user.isActive) {
        throw new AppError_1.AppError("Your account has been disabled, please contact the EMS admin Team", 403);
    }
    console.log(data.password, user.password);
    const isPasswordValid = await (0, password_1.comparePassword)(data.password, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const accessToken = (0, jwt_1.generateAccessToken)({
        id: user._id,
        email: user.email,
        role: user.role
    });
    const refreshToken = (0, jwt_1.generateRefreshToken)({
        id: user._id
    });
    await (0, user_respository_1.updateRefreshToken)(user._id.toString(), refreshToken);
    const { password, refreshToken: _, emailVerificationToken, passwordResetToken, passwordResetexpires, ...userResponse } = user.toObject();
    return {
        user: userResponse, accessToken, refreshToken
    };
};
exports.loginUser = loginUser;
const refreshAccessToken = async (token) => {
    if (!token) {
        throw new AppError_1.AppError("Refresh token is required", 401);
    }
    else {
        const decoded = (0, jwt_1.veritfyRefreshToken)(token);
        const user = await (0, user_respository_1.findUserById)(decoded.id.toString());
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        if (user.refreshToken !== token) {
            throw new AppError_1.AppError("Invalid refresh token", 401);
        }
        const accessToken = (0, jwt_1.generateAccessToken)({
            id: user._id,
            email: user.email,
            role: user.role
        });
        const newRefreshToken = (0, jwt_1.generateRefreshToken)({
            id: user._id
        });
        await (0, user_respository_1.updateRefreshToken)(user._id.toString(), newRefreshToken);
        return {
            accessToken, refreshToken: newRefreshToken
        };
    }
};
exports.refreshAccessToken = refreshAccessToken;
const logoutUser = async (token) => {
    if (!token) {
        throw new AppError_1.AppError("Refresh token not found ", 401);
    }
    const decoded = (0, jwt_1.veritfyRefreshToken)(token);
    await (0, user_respository_1.removeRefreshToken)(decoded.id);
    return true;
};
exports.logoutUser = logoutUser;
const changepasswordService = async (userId, oldPassword, newPassword) => {
    const user = await (0, user_respository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    const isPasswordValid = await (0, password_1.comparePassword)(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.AppError("Current password is incorrect", 401);
    }
    const hashedPassword = await (0, password_1.hashedpassword)(newPassword);
    await (0, user_respository_1.updateChangePassword)(user._id.toString(), hashedPassword);
};
exports.changepasswordService = changepasswordService;
