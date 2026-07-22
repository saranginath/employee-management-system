import { z } from "zod";

export const createShiftSchema = z.object({
  name: z.string().min(2),

  startTime: z.string(),

  endTime: z.string(),

  workingHours: z.number().positive(),

  graceTime: z.number().optional(),

  isActive: z.boolean().optional(),
});

export const updateShiftSchema = createShiftSchema.partial();
