import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { required } from "zod/mini";
import { ROLES } from "../constants/role";

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trime: true
        },
        password: {
            type: String,
            required: true,
            select: false,
            minLength: 8

        },
        role: {
            type: String,
            enum: [
                ROLES.ADMIN,
                ROLES.EMPLOYEE,
                ROLES.MANAGER
            ],
            default: ROLES.EMPLOYEE
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        passwordResetToken: {
            type: Date
        },
        emailVerificationToken: {
            type: String,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)
export default User;