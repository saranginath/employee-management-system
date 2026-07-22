import { Document, Types } from "mongoose";

export interface IPerformance extends Document {
    employee: Types.ObjectId;
    reviewer: Types.ObjectId;
    reviewPeriod: string;
    rating: number;
    strengths: string;
    improvements: string;
    goals: string;
    status: "draft" | "completed";
}