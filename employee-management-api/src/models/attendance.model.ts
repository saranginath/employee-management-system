import mongoose, { Schema, Types } from "mongoose";
import { STATUS } from "../constants/status";

const attendanceSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date
    },
    status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ABSENT
    },
    location: String
}, {
    timestamps: true
})
export const Attendance = mongoose.model('Attendance', attendanceSchema)