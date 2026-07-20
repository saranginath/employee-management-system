"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, "Department name is required").max(50),
    code: zod_1.z.string().trim().min(2).max(10).transform((value) => value.toUpperCase()),
    description: zod_1.z.string().max(255).optional(),
    manager: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Manager ID").optional(),
    status: zod_1.z.enum(["active", "inactive"]).optional()
});
exports.updateDepartmentSchema = exports.createDepartmentSchema.partial();
