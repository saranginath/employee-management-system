import { Schema, model } from "mongoose";
import { IShift } from "./shift.types";

const shiftSchema = new Schema<IShift>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    workingHours: {
      type: Number,
      required: true,
    },

    graceTime: {
      type: Number,
      default: 15,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Shift = model<IShift>("Shift", shiftSchema);
