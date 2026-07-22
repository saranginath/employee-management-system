import { Types } from "mongoose";
import { ILeave } from "../interfaces/leave.interface";
import {
  approveLeave,
  createLeave,
  getAllLeaves,
  getLeaveByEmployee,
  getLeaveById,
  rejectLeave,
  updateLeave,
  cancelLeave,
  getPendingLeaves,
  getLeavesForCalendar,
  getLeavesForEmployeeCalendar,
} from "../repositories/leave.repository";
import {
  ROLES,
  LEAVE_STATUS,
  LEAVE_ALLOWANCE_DAYS,
} from "../constants/leave.constnt";
import { AppError } from "../utils/AppError";

const calculateLeaveDays = (startDate: Date, endDate: Date) => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays =
    Math.ceil((end.getTime() - start.getTime()) / millisecondsPerDay) + 1;
  return diffDays > 0 ? diffDays : 0;
};

export const createLeaveService = async (
  employeeId: Types.ObjectId,
  data: Partial<ILeave>,
) => {
  const leaveData = {
    employee: employeeId,
    ...data,
  };
  return createLeave(leaveData);
};

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
    throw new AppError("Leave request not found", 404);
  }
  if (leave.employee.toString() !== employeeId) {
    throw new AppError("Not authorized to update this leave request", 403);
  }
  if (leave.status !== LEAVE_STATUS.PENDING) {
    throw new AppError("Only pending leave requests can be updated", 400);
  }
  return updateLeave(leaveId, data);
};

export const cancelLeaveService = async (
  leaveId: string,
  employeeId: string,
) => {
  const leave = await getLeaveById(leaveId);
  if (!leave) {
    throw new AppError("Leave request not found", 404);
  }
  if (leave.employee.toString() !== employeeId) {
    throw new AppError("Not authorized to cancel this leave request", 403);
  }
  if (leave.status !== LEAVE_STATUS.PENDING) {
    throw new AppError("Only pending leave requests can be cancelled", 400);
  }
  return cancelLeave(leaveId);
};

export const approveLeaveService = async (
  leaveId: string,
  approverId: string,
) => {
  const leave = await getLeaveById(leaveId);
  if (!leave) {
    throw new AppError("Leave request not found", 404);
  }
  if (leave.status !== LEAVE_STATUS.PENDING) {
    throw new AppError("Only pending leave requests can be approved", 400);
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
    throw new AppError("Leave request not found", 404);
  }
  if (leave.status !== LEAVE_STATUS.PENDING) {
    throw new AppError("Leave request has already been processed", 400);
  }
  return rejectLeave(leaveId, new Types.ObjectId(approverId), reason);
};

export const getLeaveBalanceService = async (employeeId: string) => {
  const leaves = await getLeaveByEmployee(employeeId);
  const approvedDays = leaves
    .filter((leave) => leave.status === LEAVE_STATUS.APPROVED)
    .reduce(
      (sum, leave) => sum + calculateLeaveDays(leave.startDate, leave.endDate),
      0,
    );
  const pendingDays = leaves
    .filter((leave) => leave.status === LEAVE_STATUS.PENDING)
    .reduce(
      (sum, leave) => sum + calculateLeaveDays(leave.startDate, leave.endDate),
      0,
    );
  return {
    totalAllowedDays: LEAVE_ALLOWANCE_DAYS,
    approvedDays,
    pendingDays,
    remainingDays: Math.max(LEAVE_ALLOWANCE_DAYS - approvedDays, 0),
  };
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
) => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  if (role === ROLES.ADMIN || role === ROLES.MANAGER) {
    return getLeavesForCalendar(startDate, endDate);
  }
  return getLeavesForEmployeeCalendar(employeeId, startDate, endDate);
};
