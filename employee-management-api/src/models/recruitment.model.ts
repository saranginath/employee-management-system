import { Schema, model } from "mongoose";
import { IRecruitment } from "../interfaces/recruitment.interface";
import {
    EMPLOYMENT_TYPES,
    RECRUITMENT_STATUS,
} from "../constants/recruitment.constant";

const recruitmentSchema = new Schema<IRecruitment>(
    {
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        requirements: {
            type: [String],
            default: [],
        },

        location: {
            type: String,
            required: true,
        },

        employmentType: {
            type: String,
            enum: Object.values(EMPLOYMENT_TYPES),
            default: EMPLOYMENT_TYPES.FULL_TIME,
        },

        salary: Number,

        vacancies: {
            type: Number,
            required: true,
            min: 1,
        },

        applicationDeadline: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(RECRUITMENT_STATUS),
            default: RECRUITMENT_STATUS.OPEN,
        },
    },
    {
        timestamps: true,
    }
);

export const Recruitment = model<IRecruitment>(
    "Recruitment",
    recruitmentSchema
);