"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeSchema = exports.employeeSchema = void 0;
const zod_1 = require("zod");
const role_1 = require("../constants/role");
exports.employeeSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2),
    lastName: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10),
    department: zod_1.z.string(),
    designation: zod_1.z.string(),
    role: zod_1.z.enum([role_1.ROLES.ADMIN, role_1.ROLES.EMPLOYEE, role_1.ROLES.EMPLOYEE]).default(role_1.ROLES.EMPLOYEE),
    salary: zod_1.z.number().positive()
});
exports.updateEmployeeSchema = exports.employeeSchema.partial();
