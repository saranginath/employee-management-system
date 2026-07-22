import { Document, Types } from "mongoose";

export interface INotification extends Document {
    user: Types.ObjectId;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    isRead: boolean;
}