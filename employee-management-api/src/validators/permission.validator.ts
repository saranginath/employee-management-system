import { z } from "zod";
export const createPermissionSchema = z.object({
  name: z.string(),

  module: z.string(),

  actions: z.array(z.string()),

  description: z.string().optional(),
});
