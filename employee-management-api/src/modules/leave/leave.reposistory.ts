import { Types } from "mongoose";

import Leave from "../models/leave.model";

import { LEAVE_STATUS } from "../constants/leave.constant";

export const createLeave = async (data: any) => {
  return Leave.create(data);
};

export const getLeaveById = async (id: string) => {
  return Leave.findById(id);
};

export const getAllLeaves = async () => {
  return Leave.find()

    .populate("employee", "firstName lastName email department")

    .populate("approvedBy", "firstName lastName email")

    .sort({
      createdAt: -1,
    });
};

export const getLeaveByEmployee = async (employeeId: string) => {
  return Leave.find({
    employee: new Types.ObjectId(employeeId),
  })

    .sort({
      createdAt: -1,
    });
};

export const updateLeave = async (id: string, data: any) => {
  return Leave.findByIdAndUpdate(
    id,

    data,

    {
      new: true,
      runValidators: true,
    },
  );
};

export const cancelLeave = async (id: string) => {
  return Leave.findByIdAndUpdate(
    id,

    {
      status: LEAVE_STATUS.CANCELLED,

      rejectionReason: "Cancelled by employee",
    },

    {
      new: true,
    },
  );
};

export const approveLeave = async (id: string, approvedBy: Types.ObjectId) => {
  return Leave.findByIdAndUpdate(
    id,

    {
      status: LEAVE_STATUS.APPROVED,

      approvedBy,

      rejectionReason: null,
    },

    {
      new: true,
    },
  );
};

export const rejectLeave = async (
  id: string,
  approvedBy: Types.ObjectId,
  reason: string,
) => {
  return Leave.findByIdAndUpdate(
    id,

    {
      status: LEAVE_STATUS.REJECTED,

      approvedBy,

      rejectionReason: reason,
    },

    {
      new: true,
    },
  );
};

export const getPendingLeaves = async () => {
  return Leave.find({
    status: LEAVE_STATUS.PENDING,
  })

    .populate("employee", "firstName lastName email")

    .sort({
      createdAt: -1,
    });
};

export const getCalendarLeaves = async (start: Date, end: Date) => {
  return Leave.find({
    status: LEAVE_STATUS.APPROVED,

    startDate: {
      $lte: end,
    },

    endDate: {
      $gte: start,
    },
  })

    .populate("employee", "firstName lastName")

    .sort({
      startDate: 1,
    });
};

export const checkOverlappingLeave = async (
  employeeId: string,
  startDate: Date,
  endDate: Date,
) => {
  return Leave.findOne({
    employee: new Types.ObjectId(employeeId),

    status: {
      $in: [LEAVE_STATUS.PENDING, LEAVE_STATUS.APPROVED],
    },

    startDate: {
      $lte: endDate,
    },

    endDate: {
      $gte: startDate,
    },
  });
};
