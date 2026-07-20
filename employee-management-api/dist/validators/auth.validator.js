"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const role_1 = require("../constants/role");
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, "First name required"),
    lastName: zod_1.z.string().min(2, "Last name is required"),
    email: zod_1.z.string().email("invalid email"),
    password: zod_1.z.string().min(8, "password must contain minimum 8 character"),
    role: zod_1.z.enum([
        role_1.ROLES.ADMIN,
        role_1.ROLES.MANAGER,
        role_1.ROLES.EMPLOYEE
    ]).default(role_1.ROLES.EMPLOYEE)
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(8, "password must contain minimum 8 character")
});
