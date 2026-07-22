import { z } from "zod";

export const createDocumentSchema = z.object({
    employee: z.string(),

    title: z.string().min(3),

    type: z.enum([
        "contract",
        "id-proof",
        "certificate",
        "other",
    ]),

    fileUrl: z.string().url(),

    description: z.string().optional(),
});

export const updateDocumentSchema =
    createDocumentSchema.partial();