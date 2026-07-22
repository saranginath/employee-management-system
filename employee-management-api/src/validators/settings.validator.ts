import { z } from "zod";

export const createSettingsSchema = z.object({
    companyName: z
        .string()
        .trim()
        .min(2, "Company name is required"),

    companyLogo: z
        .string()
        .url("Invalid logo URL")
        .optional()
        .or(z.literal("")),

    companyEmail: z
        .email("Invalid email")
        .optional(),

    companyPhone: z
        .string()
        .optional(),

    address: z
        .string()
        .optional(),

    currency: z
        .string()
        .default("AED"),

    timezone: z
        .string()
        .default("Asia/Dubai"),

    workingHours: z.object({
        startTime: z.string(),

        endTime: z.string(),

        workingDays: z.array(z.string()),

        weeklyOff: z.array(z.string()),

        lateAfterMinutes: z.number().min(0),
    }),

    leavePolicy: z.object({
        casualLeave: z.number().min(0),

        sickLeave: z.number().min(0),

        earnedLeave: z.number().min(0),

        carryForward: z.boolean(),

        maxCarryForward: z.number().min(0),
    }),

    notifications: z.object({
        email: z.boolean(),

        push: z.boolean(),
    }),

    emailSettings: z.object({
        smtpHost: z.string(),

        smtpPort: z.number(),

        secure: z.boolean(),

        username: z.string(),

        password: z.string(),

        senderName: z.string(),

        senderEmail: z.email(),
    }),
});

export const updateSettingsSchema = createSettingsSchema.partial();

export type CreateSettingsInput = z.infer<typeof createSettingsSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;