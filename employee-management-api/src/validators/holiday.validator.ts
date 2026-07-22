import { z } from "zod";

export const createHolidaySchema = z.object({
  title: z.string().min(3),

  date: z.coerce.date(),

  description: z.string().optional(),

  isOptional: z.boolean().optional(),
});

export const updateHolidaySchema = createHolidaySchema.partial();
