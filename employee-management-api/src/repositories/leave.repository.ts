import { Types } from "mongoose";
import { ILeave } from "../interfaces/leave.interface";
import Leave from "../models/leave.model";
import Employee from "../models/employee.model";
import { LEAVE_STATUS } from "../constants/leave.constnt";

const attachEmployeeDetails = async (leaves: any[]) => {
    return Promise.all(
        leaves.map(async (leave) => {
            const employeeRef = leave.employee;
            const employeeRefId =
                typeof employeeRef === "object" && employeeRef?._id
                    ? employeeRef._id.toString()
                    : employeeRef?.toString?.() ?? "";

            if (!employeeRefId) {
                return leave;
            }

            const employee = await Employee.findOne({
                $or: [{ _id: employeeRefId }, { user: employeeRefId }],
            })
                .select("firstName lastName email")
                .lean();

            if (!employee) {
                return leave;
            }

            return {
                ...leave.toObject?.() ?? leave,
                employee,
            };
        }),
    );
};

export const createLeave = async (data: Partial<ILeave>) => {
    return Leave.create(data);
};

export const getLeaveById = async (leaveId: string) => {
    return Leave.findById(leaveId);
};

export const getAllLeaves = async () => {
    const leaves = await Leave.find()
        .populate("employee", "firstName lastName email")
    .populate("approvedBy", "firstName lastName email")
        .sort({ createdAt: -1 });

    return attachEmployeeDetails(leaves);
};

export const getLeaveByEmployee = async (employeeId: string) => {
    const leaves = await Leave.find({
        employee: new Types.ObjectId(employeeId),
    }).sort({ createdAt: -1 });

    return attachEmployeeDetails(leaves);
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
        },
    );
};

export const approveLeave = async (
    leaveId: string,
    approvedBy: Types.ObjectId,
) => {
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
        },
    );
};

export const rejectLeave = async (
    leaveId: string,
    approvedBy: Types.ObjectId,
    rejectionReason: string,
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
        },
    );
};

export const getPendingLeaves = async () => {
    const leaves = await Leave.find({ status: LEAVE_STATUS.PENDING })
        .populate("employee", "firstName lastName email")
        .sort({ createdAt: -1 });

    return attachEmployeeDetails(leaves);
};

export const getLeavesForCalendar = async (startDate: Date, endDate: Date) => {
    const leaves = await Leave.find({
        status: LEAVE_STATUS.APPROVED,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
    })
        .populate("employee", "firstName lastName email")
        .sort({ startDate: 1 });

    return attachEmployeeDetails(leaves);
};

export const getLeavesForEmployeeCalendar = async (
    employeeId: string,
    startDate: Date,
    endDate: Date,
) => {
    const leaves = await Leave.find({
        employee: new Types.ObjectId(employeeId),
        status: { $in: [LEAVE_STATUS.PENDING, LEAVE_STATUS.APPROVED] },
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
    }).sort({ startDate: 1 });

    return attachEmployeeDetails(leaves);
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

        $or: [
            {
                startDate: {
                    $lte: endDate,
                },

                endDate: {
                    $gte: startDate,
                },
            },
        ],
    });
};

export const getCalendarLeaves = async (startDate: Date, endDate: Date) => {
    const leaves = await Leave.find({
        status: LEAVE_STATUS.APPROVED,

        startDate: {
            $lte: endDate,
        },

        endDate: {
            $gte: startDate,
        },
    })
        .sort({
            startDate: 1,
        });

    return attachEmployeeDetails(leaves);
};
