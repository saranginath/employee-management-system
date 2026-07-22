import mongoose, { Schema, Types } from "mongoose";
import { STATUS } from "../../constants/status.constant";
import { IAttendance } from "./attendance.types";

const attendanceSchema = new Schema<IAttendance>({
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
    checkOut: {
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
export default mongoose.model<IAttendance>('Attendance', attendanceSchema)