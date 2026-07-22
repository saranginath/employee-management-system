import mongoose, { Schema } from "mongoose";
const documentSchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["document", "certificate", "resume", "id-proof"],
      default: "document",
    },
    url: { type: String, required: true },
  },
  { timestamps: true },
);
export const Document = mongoose.model("Document", documentSchema);
