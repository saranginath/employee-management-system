import { Schema, model } from "mongoose";
import { INotification } from "../interfaces/notification.interface";
import { NOTIFICATION_TYPES } from "../constants/notification.constant";

const notificationSchema = new Schema<INotification>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: Object.values(NOTIFICATION_TYPES),
            default: NOTIFICATION_TYPES.INFO,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Notification = model<INotification>(
    "Notification",
    notificationSchema
);