import { Types } from "mongoose";
import { LeaveStatus, LeaveType } from "../../constants/leave.constnt";

export interface ILeave {
  employee: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  type: LeaveType;
  reason: string;
  status: LeaveStatus;
  approvedBy?: Types.ObjectId;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
