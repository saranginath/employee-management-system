import { Schema, model } from "mongoose";
import { IHoliday } from "../interfaces/holiday.interface";

const holidaySchema = new Schema<IHoliday>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            required: true,
            unique: true,
        },

        description: {
            type: String,
            default: "",
        },

        isOptional: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Holiday = model<IHoliday>("Holiday", holidaySchema);