import { z } from "zod";
import { ROLES } from "../constants/role.constant";

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("invalid email"),
  password: z.string().min(8, "password must contain minimum 8 character"),
  role: z
    .enum([ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE])
    .default(ROLES.EMPLOYEE),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "password must contain minimum 8 character"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),

  newPassword: z.string().min(8),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
