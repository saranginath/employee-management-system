import { z } from "zod";
export const checkInSchema = z.object({
  location: z.string().optional(),
});

export type checkInInput = z.infer<typeof checkInSchema>;
