import { Types } from "mongoose";
import { ILeave } from "../interfaces/leave.interface";
import Leave from "../models/leave.model";
import { LEAVE_STATUS } from "../constants/leave.constnt";

export const createLeave = async (data: Partial<ILeave>) => {
    return Leave.create(data);
};

export const getLeaveById = async (leaveId: string) => {
    return Leave.findById(leaveId);
};

export const getAllLeaves = async () => {
    return Leave.find()
        .populate("employee", "name email")
        .populate("approvedBy", "name email")
        .sort({ createdAt: -1 });
};

export const getLeaveByEmployee = async (employeeId: string) => {
    return Leave.find({
        employee: new Types.ObjectId(employeeId),
    }).sort({ createdAt: -1 });
};

export const updateLeave = async (leaveId: string, data: Partial<ILeave>) => {
    return Leave.findByIdAndUpdate(leaveId, data, {
        new: true,
        runValidators: true,
    });
};

export const cancelLeave = async (leaveId: string) => {
    return Leave.findByIdAndUpdate(
        leaveId,
        {
            status: LEAVE_STATUS.CANCELLED,
            rejectionReason: "Cancelled by employee",
        },
        {
            new: true,
            runValidators: true,
        }
    );
};

export const approveLeave = async (leaveId: string, approvedBy: Types.ObjectId) => {
    return Leave.findByIdAndUpdate(
        leaveId,
        {
            status: LEAVE_STATUS.APPROVED,
            approvedBy,
            rejectionReason: null,
        },
        {
            new: true,
            runValidators: true,
        }
    );
};

export const rejectLeave = async (
    leaveId: string,
    approvedBy: Types.ObjectId,
    rejectionReason: string
) => {
    return Leave.findByIdAndUpdate(
        leaveId,
        {
            status: LEAVE_STATUS.REJECTED,
            approvedBy,
            rejectionReason,
        },
        {
            new: true,
            runValidators: true,
        }
    );
};

export const getPendingLeaves = async () => {
    return Leave.find({ status: LEAVE_STATUS.PENDING })
        .populate("employee", "name email")
        .sort({ createdAt: -1 });
};

export const getLeavesForCalendar = async (startDate: Date, endDate: Date) => {
    return Leave.find({
        status: LEAVE_STATUS.APPROVED,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
    })
        .populate("employee", "name email")
        .sort({ startDate: 1 });
};

export const getLeavesForEmployeeCalendar = async (
    employeeId: string,
    startDate: Date,
    endDate: Date
) => {
    return Leave.find({
        employee: new Types.ObjectId(employeeId),
        status: LEAVE_STATUS.APPROVED,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
    }).sort({ startDate: 1 });
};
