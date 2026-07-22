import mongoose, { Schema } from "mongoose";
const rolePermissionSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    permissions: [{ type: String }],
  },
  { timestamps: true },
);
export const RolePermission = mongoose.model(
  "RolePermission",
  rolePermissionSchema,
);
