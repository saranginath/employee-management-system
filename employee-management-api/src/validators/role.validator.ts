import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string(),

  description: z.string().optional(),

  permissions: z.array(z.string()).optional(),
});
