import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "./env";

export const generateAccessToken = (
    payload: object
) => {

    return jwt.sign(
        payload,
        ENV.JWT_SECRET,
        {
            expiresIn: ENV.JWT_EXPIRES_IN as SignOptions["expiresIn"],
        }
    );

};

export const generateRefreshToken = (payload: object) => {

    return jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: ENV.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]
    })

}


export const veritfyRefreshToken = (token: string) =>
    jwt.verify(token, ENV.REFRESH_TOKEN_SECRET)