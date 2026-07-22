"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaveCalendarService = exports.getPendingLeaveService = exports.getLeaveHistoryService = exports.getLeaveBalanceService = exports.rejectLeaveService = exports.approveLeaveService = exports.cancelLeaveService = exports.updateLeaveService = exports.getLeaveService = exports.createLeaveService = void 0;
const mongoose_1 = require("mongoose");
const leave_repository_1 = require("../repositories/leave.repository");
const leave_constnt_1 = require("../constants/leave.constnt");
const AppError_1 = require("../utils/AppError");
const calculateLeaveDays = (startDate, endDate) => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / millisecondsPerDay) + 1;
    return diffDays > 0 ? diffDays : 0;
};
const createLeaveService = async (employeeId, data) => {
    const leaveData = {
        employee: employeeId,
        ...data,
    };
    return (0, leave_repository_1.createLeave)(leaveData);
};
exports.createLeaveService = createLeaveService;
const getLeaveService = async (employeeId, role) => {
    if (role === leave_constnt_1.ROLES.ADMIN || role === leave_constnt_1.ROLES.MANAGER) {
        return (0, leave_repository_1.getAllLeaves)();
    }
    return (0, leave_repository_1.getLeaveByEmployee)(employeeId);
};
exports.getLeaveService = getLeaveService;
const updateLeaveService = async (leaveId, employeeId, data) => {
    const leave = await (0, leave_repository_1.getLeaveById)(leaveId);
    if (!leave) {
        throw new AppError_1.AppError("Leave request not found", 404);
    }
    if (leave.employee.toString() !== employeeId) {
        throw new AppError_1.AppError("Not authorized to update this leave request", 403);
    }
    if (leave.status !== leave_constnt_1.LEAVE_STATUS.PENDING) {
        throw new AppError_1.AppError("Only pending leave requests can be updated", 400);
    }
    return (0, leave_repository_1.updateLeave)(leaveId, data);
};
exports.updateLeaveService = updateLeaveService;
const cancelLeaveService = async (leaveId, employeeId) => {
    const leave = await (0, leave_repository_1.getLeaveById)(leaveId);
    if (!leave) {
        throw new AppError_1.AppError("Leave request not found", 404);
    }
    if (leave.employee.toString() !== employeeId) {
        throw new AppError_1.AppError("Not authorized to cancel this leave request", 403);
    }
    if (leave.status !== leave_constnt_1.LEAVE_STATUS.PENDING) {
        throw new AppError_1.AppError("Only pending leave requests can be cancelled", 400);
    }
    return (0, leave_repository_1.cancelLeave)(leaveId);
};
exports.cancelLeaveService = cancelLeaveService;
const approveLeaveService = async (leaveId, approverId) => {
    const leave = await (0, leave_repository_1.getLeaveById)(leaveId);
    if (!leave) {
        throw new AppError_1.AppError("Leave request not found", 404);
    }
    if (leave.status !== leave_constnt_1.LEAVE_STATUS.PENDING) {
        throw new AppError_1.AppError("Only pending leave requests can be approved", 400);
    }
    return (0, leave_repository_1.approveLeave)(leaveId, new mongoose_1.Types.ObjectId(approverId));
};
exports.approveLeaveService = approveLeaveService;
const rejectLeaveService = async (leaveId, approverId, reason) => {
    const leave = await (0, leave_repository_1.getLeaveById)(leaveId);
    if (!leave) {
        throw new AppError_1.AppError("Leave request not found", 404);
    }
    if (leave.status !== leave_constnt_1.LEAVE_STATUS.PENDING) {
        throw new AppError_1.AppError("Leave request has already been processed", 400);
    }
    return (0, leave_repository_1.rejectLeave)(leaveId, new mongoose_1.Types.ObjectId(approverId), reason);
};
exports.rejectLeaveService = rejectLeaveService;
const getLeaveBalanceService = async (employeeId) => {
    const leaves = await (0, leave_repository_1.getLeaveByEmployee)(employeeId);
    const approvedDays = leaves
        .filter((leave) => leave.status === leave_constnt_1.LEAVE_STATUS.APPROVED)
        .reduce((sum, leave) => sum + calculateLeaveDays(leave.startDate, leave.endDate), 0);
    const pendingDays = leaves
        .filter((leave) => leave.status === leave_constnt_1.LEAVE_STATUS.PENDING)
        .reduce((sum, leave) => sum + calculateLeaveDays(leave.startDate, leave.endDate), 0);
    return {
        totalAllowedDays: leave_constnt_1.LEAVE_ALLOWANCE_DAYS,
        approvedDays,
        pendingDays,
        remainingDays: Math.max(leave_constnt_1.LEAVE_ALLOWANCE_DAYS - approvedDays, 0),
    };
};
exports.getLeaveBalanceService = getLeaveBalanceService;
const getLeaveHistoryService = async (employeeId) => {
    return (0, leave_repository_1.getLeaveByEmployee)(employeeId);
};
exports.getLeaveHistoryService = getLeaveHistoryService;
const getPendingLeaveService = async () => {
    return (0, leave_repository_1.getPendingLeaves)();
};
exports.getPendingLeaveService = getPendingLeaveService;
const getLeaveCalendarService = async (employeeId, role) => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    if (role === leave_constnt_1.ROLES.ADMIN || role === leave_constnt_1.ROLES.MANAGER) {
        return (0, leave_repository_1.getLeavesForCalendar)(startDate, endDate);
    }
    return (0, leave_repository_1.getLeavesForEmployeeCalendar)(employeeId, startDate, endDate);
};
exports.getLeaveCalendarService = getLeaveCalendarService;
