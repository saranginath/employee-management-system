import { Schema, Types } from "mongoose";
import { Role, ROLES } from "../constants/role";

export interface IEmployee {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: Types.ObjectId;
    role: Role,
    designation: string;
    salary: number
}