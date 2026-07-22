import { Schema, model } from "mongoose";
import { ISettings } from "../interfaces/settings.interface";

const settingsSchema = new Schema<ISettings>(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        companyLogo: {
            type: String,
            default: "",
        },

        companyEmail: {
            type: String,
            trim: true,
            lowercase: true,
        },

        companyPhone: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
        },

        currency: {
            type: String,
            default: "AED",
            uppercase: true,
        },

        timezone: {
            type: String,
            default: "Asia/Dubai",
        },

        workingHours: {
            startTime: {
                type: String,
                default: "09:00",
            },

            endTime: {
                type: String,
                default: "18:00",
            },

            workingDays: {
                type: [String],
                default: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                ],
            },

            weeklyOff: {
                type: [String],
                default: ["Saturday", "Sunday"],
            },

            lateAfterMinutes: {
                type: Number,
                default: 15,
            },
        },

        leavePolicy: {
            casualLeave: {
                type: Number,
                default: 12,
                min: 0,
            },

            sickLeave: {
                type: Number,
                default: 10,
                min: 0,
            },

            earnedLeave: {
                type: Number,
                default: 15,
                min: 0,
            },

            carryForward: {
                type: Boolean,
                default: true,
            },

            maxCarryForward: {
                type: Number,
                default: 10,
                min: 0,
            },
        },

        notifications: {
            email: {
                type: Boolean,
                default: true,
            },

            push: {
                type: Boolean,
                default: true,
            },
        },

        emailSettings: {
            smtpHost: {
                type: String,
                default: "",
            },

            smtpPort: {
                type: Number,
                default: 587,
            },

            secure: {
                type: Boolean,
                default: false,
            },

            username: {
                type: String,
                default: "",
            },

            password: {
                type: String,
                default: "",
            },

            senderName: {
                type: String,
                default: "",
            },

            senderEmail: {
                type: String,
                default: "",
            },
        },
    },
    {
        timestamps: true,
    }
);

export const Settings = model<ISettings>("Settings", settingsSchema);