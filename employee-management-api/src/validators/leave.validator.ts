import { z } from "zod";
import { LEAVE_TYPES } from "../constants/leave.constnt";


const leaveSchema = z.object({

    startDate: z.coerce.date({
        message: "Start date is required",
    }),

    endDate: z.coerce.date({
        message: "End date is required",
    }),

    type: z.enum([
        LEAVE_TYPES.CASUAL,
        LEAVE_TYPES.EARNED,
        LEAVE_TYPES.SICK,
        LEAVE_TYPES.UNPAID
    ]),

    reason: z
        .string()
        .min(5, "Reason must be at least 5 characters")
        .max(500, "Reason cannot exceed 500 characters"),

});



export const createLeaveSchema =
    leaveSchema.refine(
        (data) =>
            data.endDate >= data.startDate,
        {
            message:
                "End date must be after or equal to start date",
            path: ["endDate"],
        }
    );



export const updateLeaveSchema =
    leaveSchema
        .partial()
        .refine(
            (data) => {

                if (
                    data.startDate &&
                    data.endDate
                ) {
                    return data.endDate >= data.startDate;
                }

                return true;

            },
            {
                message:
                    "End date must be after or equal to start date",
                path: ["endDate"],
            }
        );



export const rejectLeaveSchema = z.object({

    reason: z
        .string()
        .min(5, "Rejection reason must be at least 5 characters")
        .max(500, "Rejection reason cannot exceed 500 characters"),

});


export type CreateLeaveInput =
    z.infer<typeof createLeaveSchema>;

export type UpdateLeaveInput =
    z.infer<typeof updateLeaveSchema>;

export type RejectLeaveSchema =
    z.infer<typeof rejectLeaveSchema>;