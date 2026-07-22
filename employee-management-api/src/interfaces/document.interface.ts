import { Document, Types } from "mongoose";

export interface IDocument extends Document {
  employee: Types.ObjectId;
  title: string;
  type: "contract" | "id-proof" | "certificate" | "other";
  fileUrl: string;
  uploadedBy: Types.ObjectId;
  description?: string;
}
