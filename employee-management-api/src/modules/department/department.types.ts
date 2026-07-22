import { Types } from "mongoose";

export interface IDepartment {
  name: string;
  code: string;
  description?: string;
  manager?: Types.ObjectId | null;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
export type CreatedepartmentData = {
  name: string;
  code: string;
  description?: string;
  status?: "active" | "inactive";
  manager?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
