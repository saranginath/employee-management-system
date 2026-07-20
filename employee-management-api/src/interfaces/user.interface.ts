import { Role } from "../constants/role";
import { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string,
    role: Role;
    isEmailVerified: boolean;
    refreshToken?: string;
    passwordResetToken?: string;
    passwordResetexpires?: Date;
    emailVerificationToken?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}