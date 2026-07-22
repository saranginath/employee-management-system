import { Types } from "mongoose";
import { Status } from "../constants/status.constant";

export interface IAttendance {
    employee: Types.ObjectId;
    date: Date;
    checkIn: Date;
    checkOut?: Date;
    status: Status;
    location?: string;
    createAt: Date;
    updatedAt: Date;
}