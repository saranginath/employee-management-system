"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = exports.changePassword = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const asyncHandler_1 = require("../middleware/asyncHandler");
const auth_validator_1 = require("../validators/auth.validator");
const auth_service_1 = require("../services/auth.service");
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = auth_validator_1.registerSchema.parse(req.body);
    const user = await (0, auth_service_1.registerUser)(data);
    res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: user
    });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = auth_validator_1.loginSchema.parse(req.body);
    const result = await (0, auth_service_1.loginUser)(data);
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prodcution",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        sucess: true,
        message: "Login successful",
        data: {
            user: result.user,
            accessToken: result.accessToken
        }
    });
});
exports.refreshToken = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const token = req.cookies.refreshToken;
    const result = await (0, auth_service_1.refreshAccessToken)(token);
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prodcution",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        success: true,
        message: "Access token refreshed successfully",
        accessToken: result.accessToken
    });
});
exports.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const token = req.cookies.refreshToken;
    await (0, auth_service_1.logoutUser)(token);
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
});
exports.changePassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await auth_validator_1.changePasswordSchema.parse(req.body);
    await (0, auth_service_1.changepasswordService)(req.user.id, data.oldPassword, data.newPassword);
    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});
exports.forgotPasswordController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email } = req.body;
    const result = await (0, auth_service_1.forgotPasswordService)(email);
    res.status(200).json(result);
});
const resetPasswordController = async (req, res) => {
    const { token } = req.params;
    const password = req.body.password;
    const result = await (0, auth_service_1.resetPasswordService)(token, password);
    res.status(200).json({
        success: true,
        message: "Password updated successfully",
    });
};
exports.resetPasswordController = resetPasswordController;
