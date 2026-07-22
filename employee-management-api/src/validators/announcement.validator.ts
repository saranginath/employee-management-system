import { z } from "zod";

export const createAnnouncementSchema = z.object({
    title: z.string().min(3),

    description: z.string().min(10),

    audience: z.enum([
        "all",
        "admin",
        "manager",
        "employee",
    ]).optional(),

    expiresAt: z.coerce.date().optional(),
});

export const updateAnnouncementSchema =
    createAnnouncementSchema.partial();