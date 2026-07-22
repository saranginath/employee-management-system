import { z } from "zod";

export const createLeaveSchema = z
  .object({
    type: z.enum(["casual", "sick", "earned", "unpaid"]),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),

    reason: z.string().min(5, "Reason required"),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Invalid date range",
    path: ["endDate"],
  });

export const updateLeaveSchema = z.object({
  type: z.enum(["casual", "sick", "earned", "unpaid"]).optional(),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),

  reason: z.string().min(5).optional(),
});
