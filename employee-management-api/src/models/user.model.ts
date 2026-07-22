import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { ROLES } from "../constants/role.constant";

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
            trim: true
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

        emailVerificationToken: {
            type: String,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        passwordResetToken: {
            type: String
        },
        address: {
            type: String,
            trim: true,
            default: null
        },
        phone: {
            type: Number,
            trim: true,
            required: true
        },
        passwordResetExpires: {
            type: String
        },
        isFirstLogin: {
            type: Boolean,
            default: true,
        },
        profilePicture: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true
    }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)
export default User;