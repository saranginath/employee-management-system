import { asyncHanlder } from "../middleware/asyncHandler";
import { Response, Request } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { changepasswordService, loginUser, logoutUser, refreshAccessToken, registerUser } from "../services/auth.service";
export const register = asyncHanlder(
    async (req: Request, res: Response) => {
        const data = registerSchema.parse(req.body);
        const user = await registerUser(data);
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: user
        })
    }
)

export const login = asyncHanlder(async (req: Request, res: Response) => {

    const data = loginSchema.parse(req.body);
    const result = await loginUser(data);


    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prodcution",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({
        sucess: true,
        message: "Login successful",
        data: {
            user: result.user,
            accessToken: result.accessToken
        }
    })

})
export const refreshToken = asyncHanlder(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    const result = await refreshAccessToken(token);
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prodcution",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000

    })
    res.status(200).json({
        success: true,
        message: "Access token refreshed successfully",
        accessToken: result.accessToken
    })
})

export const logout = asyncHanlder(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    await logoutUser(token);
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

    res.status(200).json({
        success: true,
        message: "Logout successful"
    })
})

export const changePassword = asyncHanlder(async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    await changepasswordService(
        req.user!.id,
        oldPassword,
        newPassword
    )
    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    })

})