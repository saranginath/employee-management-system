import { Types } from "mongoose";

import {
    createLeave,
    getLeaveById,
    getAllLeaves,
    getLeaveByEmployee,
    updateLeave,
    cancelLeave,
    approveLeave,
    rejectLeave,
    getPendingLeaves,
    getCalendarLeaves,
    getLeavesForEmployeeCalendar,
    checkOverlappingLeave,
} from "../repositories/leave.repository";

import {
    LEAVE_STATUS,
    LEAVE_ALLOWANCE_DAYS,
    ROLES,
} from "../constants/leave.constnt";

import { ILeave } from "../interfaces/leave.interface";

import { AppError } from "../utils/AppError";

const calculateLeaveDays = (startDate: Date, endDate: Date) => {
    const diff =
        Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;

    return diff;
};

// Apply Leave

export const createLeaveService = async (
    employeeId: string,
    data: Partial<ILeave>,
) => {
    const exists = await checkOverlappingLeave(
        employeeId,
        data.startDate!,
        data.endDate!,
    );

    if (exists) {
        throw new AppError("Leave already exists for selected dates", 400);
    }

    return createLeave({
        employee: new Types.ObjectId(employeeId),

        ...data,
    });
};

// Get Leaves

export const getLeaveService = async (employeeId: string, role: string) => {
    if (role === ROLES.ADMIN || role === ROLES.MANAGER) {
        return getAllLeaves();
    }

    return getLeaveByEmployee(employeeId);
};

export const updateLeaveService = async (
    leaveId: string,
    employeeId: string,
    data: Partial<ILeave>,
) => {
    const leave = await getLeaveById(leaveId);

    if (!leave) {
        throw new AppError("Leave not found", 404);
    }

    if (leave.employee.toString() !== employeeId) {
        throw new AppError("Unauthorized", 403);
    }

    if (leave.status !== LEAVE_STATUS.PENDING) {
        throw new AppError("Only pending leave can update", 400);
    }

    return updateLeave(leaveId, data);
};

export const cancelLeaveService = async (
    leaveId: string,
    employeeId: string,
) => {
    const leave = await getLeaveById(leaveId);

    if (!leave) {
        throw new AppError("Leave not found", 404);
    }

    if (leave.employee.toString() !== employeeId) {
        throw new AppError("Unauthorized", 403);
    }

    if (leave.status !== LEAVE_STATUS.PENDING) {
        throw new AppError("Only pending leave can cancel", 400);
    }

    return cancelLeave(leaveId);
};

export const approveLeaveService = async (
    leaveId: string,
    approverId: string,
) => {
    const leave = await getLeaveById(leaveId);

    if (!leave) {
        throw new AppError("Leave not found", 404);
    }

    if (leave.status !== LEAVE_STATUS.PENDING) {
        throw new AppError("Already processed", 400);
    }

    return approveLeave(leaveId, new Types.ObjectId(approverId));
};

export const rejectLeaveService = async (
    leaveId: string,
    approverId: string,
    reason: string,
) => {
    const leave = await getLeaveById(leaveId);

    if (!leave) {
        throw new AppError("Leave not found", 404);
    }

    if (leave.status !== LEAVE_STATUS.PENDING) {
        throw new AppError("Already processed", 400);
    }

    return rejectLeave(leaveId, new Types.ObjectId(approverId), reason);
};

export const getLeaveBalanceService = async (employeeId: string) => {
    const leaves = await getLeaveByEmployee(employeeId);

    const result: any = {};

    (
        Object.keys(LEAVE_ALLOWANCE_DAYS) as Array<
            keyof typeof LEAVE_ALLOWANCE_DAYS
        >
    ).forEach((type) => {
        const used = leaves

            .filter(
                (leave) =>
                    leave.type === type && leave.status === LEAVE_STATUS.APPROVED,
            )

            .reduce(
                (sum, leave) =>
                    sum + calculateLeaveDays(leave.startDate, leave.endDate),

                0,
            );

        result[type] = {
            allowed: LEAVE_ALLOWANCE_DAYS[type],

            used,

            remaining: Math.max(LEAVE_ALLOWANCE_DAYS[type] - used, 0),
        };
    });

    return result;
};

export const getLeaveHistoryService = async (employeeId: string) => {
    return getLeaveByEmployee(employeeId);
};

export const getPendingLeaveService = async () => {
    return getPendingLeaves();
};

export const getLeaveCalendarService = async (
    employeeId: string,
    role: string,
    start?: string,
    end?: string,
) => {
    const now = new Date();

    const startDate = start
        ? new Date(start)
        : new Date(now.getFullYear(), now.getMonth(), 1);

    const endDate = end
        ? new Date(end)
        : new Date(now.getFullYear(), now.getMonth() + 1, 0);

    if (role === ROLES.EMPLOYEE) {
        return getLeavesForEmployeeCalendar(employeeId, startDate, endDate);
    }

    return getCalendarLeaves(startDate, endDate);
};
