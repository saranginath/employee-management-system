import mongoose, { model, Schema } from "mongoose";
import { ILeave } from "../interfaces/leave.interface";
import { LEAVE_STATUS, LEAVE_TYPES } from "../constants/leave.constnt";

const leaveSchema = new Schema<ILeave>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(LEAVE_TYPES),
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(LEAVE_STATUS),
      default: LEAVE_STATUS.PENDING,
    },
    approvedBy: {},
    rejectionReason: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ILeave>("Leave", leaveSchema);
