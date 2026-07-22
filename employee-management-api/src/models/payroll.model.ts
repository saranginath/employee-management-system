import mongoose, { Schema, model } from "mongoose";
import { IPayroll } from "../interfaces/payroll.interface";
import { PAYROLL_STATUS } from "../constants/payroll.constant";

const payrollSchema = new Schema<IPayroll>(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        basicSalary: {
            type: Number,
            required: true,
        },

        bonus: {
            type: Number,
            default: 0,
        },

        deductions: {
            type: Number,
            default: 0,
        },

        netSalary: {
            type: Number,
            required: true,
        },

        month: {
            type: String,
            required: true,
        },

        year: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(PAYROLL_STATUS),
            default: PAYROLL_STATUS.PENDING,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IPayroll>("Payroll", payrollSchema);