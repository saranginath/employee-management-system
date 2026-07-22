import { z } from "zod";
export const createDepartmentSchema = z.object({
  name: z.string().trim().min(2, "Department name is required").max(50),
  code: z
    .string()
    .trim()
    .min(2)
    .max(10)
    .transform((value) => value.toUpperCase()),
  description: z.string().max(255).optional(),
  manager: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Manager ID")
    .optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
export const updateDepartmentSchema = createDepartmentSchema.partial();
