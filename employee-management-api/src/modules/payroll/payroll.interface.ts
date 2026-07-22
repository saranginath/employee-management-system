import { Document, Types } from "mongoose";

export interface IPayroll extends Document {
  employee: Types.ObjectId;
  basicSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  month: string;
  year: number;
  status: "pending" | "paid";
}
