import { Schema, model } from "mongoose";
import { IPerformance } from "../interfaces/performance.interface";
import { PERFORMANCE_STATUS } from "../constants/performance.constant";

const performanceSchema = new Schema<IPerformance>(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        reviewer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        reviewPeriod: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        strengths: {
            type: String,
            required: true,
        },

        improvements: {
            type: String,
            required: true,
        },

        goals: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(PERFORMANCE_STATUS),
            default: PERFORMANCE_STATUS.DRAFT,
        },
    },
    {
        timestamps: true,
    }
);

export const Performance = model<IPerformance>(
    "Performance",
    performanceSchema
);