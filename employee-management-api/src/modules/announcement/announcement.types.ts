import { Document, Types } from "mongoose";

export interface IAnnouncement extends Document {
    title: string;
    content: string;
    audience: "all" | "admin" | "manager" | "employee";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}