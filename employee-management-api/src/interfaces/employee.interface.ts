import { Types } from "mongoose";
import { Role } from "../constants/role.constant";

export interface IEmployee {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: Types.ObjectId;
    designation: string;
    salary: number;
    user: Types.ObjectId;
}

export interface CreateEmployeeDTO extends Omit<IEmployee, "user"> {
    role: Role
}