export const STATUS = {
    PRESENT: "present",
    ABSENT: "absent",
    LATE: "late",
    HALFDAY: "half-day"
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];