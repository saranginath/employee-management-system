import { z } from "zod";

export const createPerformanceSchema = z.object({
  employee: z.string(),

  reviewPeriod: z.string(),

  rating: z.number().min(1).max(5),

  strengths: z.string().min(5),

  improvements: z.string().min(5),

  goals: z.string().min(5),

  status: z.enum(["draft", "completed"]).optional(),
});

export const updatePerformanceSchema = createPerformanceSchema.partial();
