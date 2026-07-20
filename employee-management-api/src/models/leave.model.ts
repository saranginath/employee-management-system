import { model, Schema, Types } from "mongoose";
import { ILeave } from "../interfaces/leave.interface";
import { LEAVE_STATUS, LEAVE_TYPES } from "../constants";

const leaveSchema = new Schema<ILeave>(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        type: {
            type: String,
            enum: Object.values(LEAVE_TYPES),
            required: true
        },
        reason: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: Object.values(LEAVE_STATUS),
            default: LEAVE_STATUS.PENDING
        },
        approvedBy: {

        },
        rejectionReason: {
            type: String,
            trim: true,
            default: null
        }
    }, {
    timestamps: true
}
);

export const Leave = model<ILeave>("Leave", leaveSchema)