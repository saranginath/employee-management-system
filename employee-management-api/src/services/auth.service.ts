import {
    createUser,
    findUserByEmail,
    findUserById,
    findUserByResetToken,
    removeRefreshToken,
    saveUser,
    updateChangePassword,
    updatePassword,
    updateRefreshToken,
} from "../repositories/user.respository";
import { AppError } from "../utils/AppError";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import { comparePassword, hashedpassword } from "../utils/password";
import {
    generateAccessToken,
    generateRefreshToken,
    veritfyRefreshToken,
} from "../config/jwt";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";

export const registerUser = async (data: any) => {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
        throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await hashedpassword(data.password);

    const user = await createUser({
        ...data,
        password: hashedPassword,
    });

    const { password, ...userResponse } = user.toObject();

    return userResponse;
};

export const loginUser = async (data: LoginInput) => {
    console.log("sarangic");
    const user = await findUserByEmail(data.email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    if (!user?.isEmailVerified) {
        throw new AppError("Please verify your mail before logging", 403);
    }
    if (!user.isActive) {
        throw new AppError(
            "Your account has been disabled, please contact the EMS admin Team",
            403,
        );
    }
    console.log(data.password, user.password);

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken({
        id: user._id,
        email: user.email,
        role: user.role,
    });
    const refreshToken = generateRefreshToken({
        id: user._id,
    });

    await updateRefreshToken(user._id.toString(), refreshToken);
    const {
        password,
        refreshToken: _,
        emailVerificationToken,
        passwordResetToken,
        passwordResetExpires,
        ...userResponse
    } = user.toObject();

    return {
        user: userResponse,
        accessToken,
        refreshToken,
    };
};

export const refreshAccessToken = async (token: string) => {
    if (!token) {
        throw new AppError("Refresh token is required", 401);
    } else {
        const decoded = veritfyRefreshToken(token) as { id: number };
        const user = await findUserById(decoded.id.toString());
        if (!user) {
            throw new AppError("User not found", 404);
        }
        if (user.refreshToken !== token) {
            throw new AppError("Invalid refresh token", 401);
        }
        const accessToken = generateAccessToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });
        const newRefreshToken = generateRefreshToken({
            id: user._id,
        });
        await updateRefreshToken(user._id.toString(), newRefreshToken);
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
};

export const logoutUser = async (token: string) => {
    if (!token) {
        throw new AppError("Refresh token not found ", 401);
    }
    const decoded = veritfyRefreshToken(token) as { id: string };
    await removeRefreshToken(decoded.id);
    return true;
};

export const changepasswordService = async (
    userId: string,
    oldPassword: string,
    newPassword: string,
) => {
    const user = await findUserById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new AppError("Current password is incorrect", 401);
    }
    const hashedPassword = await hashedpassword(newPassword);
    user.password = hashedPassword;

    await saveUser(user);
    return true;
};

export const forgotPasswordService = async (email: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Generate Raw Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // Hash Token
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    user.passwordResetToken = hashedToken;

    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await saveUser(user);

    const html = `
        <h2>Password Reset</h2>

        <p>Click the button below to reset your password.</p>

        <a
            href="${resetUrl}"
            style="
                background:#2563eb;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:6px;
            "
        >
            Reset Password
        </a>

        <p>This link expires in 10 minutes.</p>
    `;
    await sendEmail(user.email, "Reset Your Password", html);

    return {
        message: "Password reset link sent to your email",
    };
};

export const resetPasswordService = async (token: string, password: string) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await findUserByResetToken(hashedToken);
    if (!user) {
        throw new AppError("Invalid or expired rset link", 409);
    }
    const hashpassword = await hashedpassword(password);
    await updatePassword(user._id.toString(), hashpassword);
};
