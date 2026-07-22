import { z } from "zod";

export const createNotificationSchema = z.object({
    title: z.string().min(3),

    message: z.string().min(5),

    type: z.enum([
        "info",
        "success",
        "warning",
        "error",
    ]).optional(),
});

export const updateNotificationSchema =
    createNotificationSchema.partial();