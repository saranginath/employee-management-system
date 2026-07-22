"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const role_constant_1 = require("../constants/role.constant");
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, "First name required"),
    lastName: zod_1.z.string().min(2, "Last name is required"),
    email: zod_1.z.string().email("invalid email"),
    password: zod_1.z.string().min(8, "password must contain minimum 8 character"),
    role: zod_1.z.enum([
        role_constant_1.ROLES.ADMIN,
        role_constant_1.ROLES.MANAGER,
        role_constant_1.ROLES.EMPLOYEE
    ]).default(role_constant_1.ROLES.EMPLOYEE)
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(8, "password must contain minimum 8 character")
});
exports.changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string(),
    newPassword: zod_1.z.string().min(8)
});
