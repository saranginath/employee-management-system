import mongoose, { Schema } from "mongoose";
const announcementSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        audience: { type: String, enum: ["all", "admin", "manager", "employee"], default: "all" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);

