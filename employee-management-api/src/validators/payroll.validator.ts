import { z } from "zod";

export const createPayrollSchema = z.object({
    employee: z.string(),

    basicSalary: z.number(),

    bonus: z.number().optional().default(0),

    deductions: z.number().optional().default(0),

    month: z.string(),

    year: z.number(),

    status: z.enum(["pending", "paid"]).optional(),
});

export const updatePayrollSchema = createPayrollSchema.partial();