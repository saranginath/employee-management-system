import { Types } from "mongoose";

export interface ILeave {
  employee: Types.ObjectId;

  type: "casual" | "sick" | "earned" | "unpaid";

  startDate: Date;

  endDate: Date;

  reason: string;

  status: "pending" | "approved" | "rejected" | "cancelled";

  approvedBy?: Types.ObjectId;

  rejectionReason?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
