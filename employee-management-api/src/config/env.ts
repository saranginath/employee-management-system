import dotenv from "dotenv";
dotenv.config();



const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} is missing`)
    }
    return value;

}
export const ENV = {
    PORT: Number(process.env.PORT) || 5000,
    MONGO_URI: getEnv("MONGO_URI"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN"),
    REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
    REFRESH_TOKEN_EXPIRES_IN: getEnv("REFRESH_TOKEN_EXPIRES_IN")


}