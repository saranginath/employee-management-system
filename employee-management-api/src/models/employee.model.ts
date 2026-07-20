import mongoose, { Schema } from "mongoose";
import { IEmployee } from "../interfaces/employee.interface";
import { ROLES } from "../constants/role";
import { object } from "zod";

const employeeSchema = new Schema<IEmployee>(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department"
        },
        designation: {
            type: String, required: true
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.EMPLOYEE
        },
        salary: {
            type: Number,
            required: true
        }
    }, {
    timestamps: true
}
)
export default mongoose.model<IEmployee>("Employee", employeeSchema)