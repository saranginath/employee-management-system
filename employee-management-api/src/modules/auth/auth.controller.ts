import { asyncHandler } from "../../middleware/asyncHandler";
import { Response, Request } from "express";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "../../validators/auth.validator";
import {
  changepasswordService,
  forgotPasswordService,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPasswordService,
} from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const user = await registerUser(data);
  res.status(200).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await loginUser(data);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "prodcution",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    sucess: true,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    const result = await refreshAccessToken(token);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prodcution",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: result.accessToken,
    });
  },
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  await logoutUser(token);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await changePasswordSchema.parse(req.body);
    await changepasswordService(
      req.user!.id,
      data.oldPassword,
      data.newPassword,
    );
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  },
);

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    res.status(200).json(result);
  },
);

export const resetPasswordController = async (req: Request, res: Response) => {
  const { token } = req.params;
  const password = req.body.password;
  const result = await resetPasswordService(token as string, password);
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};
