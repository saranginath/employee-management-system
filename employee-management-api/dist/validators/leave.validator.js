"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectLeaveSchema = exports.createLeaveSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.createLeaveSchema = zod_1.z.object({
    startDate: zod_1.z.coerce.date({
        message: "Start date is required"
    }),
    endDate: zod_1.z.coerce.date({ message: "End date is required" }),
    type: zod_1.z.enum([constants_1.LEAVE_TYPES.CASUAL, constants_1.LEAVE_TYPES.EARNED, constants_1.LEAVE_TYPES.SICK, constants_1.LEAVE_TYPES.UNPAID]),
    reason: zod_1.z.string().min(5, "Reason must be least 5 charcters").max(500, "Reason cannot exceed 500 charcter")
}).refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"]
});
exports.rejectLeaveSchema = zod_1.z.object({
    reason: zod_1.z.string().min(5, "Rejection reason must be at least 5 charcter").max(500, "Rejection reason cannot exceed 500 charcters")
});
