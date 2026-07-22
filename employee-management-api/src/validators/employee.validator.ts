import { z } from "zod";
import { ROLES } from "../constants/role.constant";
export const employeeSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  department: z.string(),
  designation: z.string(),
  role: z
    .enum([ROLES.ADMIN, ROLES.EMPLOYEE, ROLES.EMPLOYEE])
    .default(ROLES.EMPLOYEE),
  salary: z.number().positive(),
});
export const updateEmployeeSchema = employeeSchema.partial();
