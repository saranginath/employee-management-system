
export const ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    EMPLOYEE: "employee",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];


export const STATUS = {
    PRESENT: "present",
    ABSENT: "absent",
    LATE: "late",
    HALFDAY: "half-day",
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];


export const LEAVE_STATUS = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
} as const;

export type LeaveStatus =
    typeof LEAVE_STATUS[keyof typeof LEAVE_STATUS];


export const LEAVE_TYPES = {
    CASUAL: "casual",
    SICK: "sick",
    EARNED: "earned",
    UNPAID: "unpaid",
} as const;

export type LeaveType =
    typeof LEAVE_TYPES[keyof typeof LEAVE_TYPES];