import { Schema, model } from "mongoose";

import { ILeave } from "../interfaces/leave.interface";

const leaveSchema = new Schema<ILeave>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    type: {
      type: String,
      enum: ["casual", "sick", "earned", "unpaid"],
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

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    rejectionReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default model<ILeave>("Leave", leaveSchema);
