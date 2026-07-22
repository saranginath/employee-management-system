import { Role } from "../constants/role.constant";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    isFirstLogin: boolean;
    isEmailVerified: boolean;
    isActive: boolean;
    refreshToken?: string;
    address: string
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    emailVerificationToken?: string;
    phone: number;
    createdAt?: Date;
    updatedAt?: Date;
    profilePicture?: string;
}



export interface ICreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    isFirstLogin?: boolean;
    isEmailVerified?: boolean;
    phone: number;
    isActive?: boolean;
}




