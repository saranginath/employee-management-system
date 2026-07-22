import { Schema, model } from "mongoose";
import { IAuditLog } from "../interfaces/auditLog.interface";

const auditLogSchema = new Schema<IAuditLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT"],
      required: true,
    },

    module: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    oldData: {
      type: Object,
    },

    newData: {
      type: Object,
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

export const AuditLog = model<IAuditLog>("AuditLog", auditLogSchema);
