"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEAVE_TYPES = exports.LEAVE_STATUS = exports.STATUS = exports.ROLES = void 0;
exports.ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    EMPLOYEE: "employee",
};
exports.STATUS = {
    PRESENT: "present",
    ABSENT: "absent",
    LATE: "late",
    HALFDAY: "half-day",
};
exports.LEAVE_STATUS = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
};
exports.LEAVE_TYPES = {
    CASUAL: "casual",
    SICK: "sick",
    EARNED: "earned",
    UNPAID: "unpaid",
};
