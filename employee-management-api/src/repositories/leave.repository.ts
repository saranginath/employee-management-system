import { Types } from "mongoose";
import { ILeave } from "../interfaces/leave.interface";
import { Leave } from "../models/leave.model";
import { LEAVE_STATUS } from "../constants";


export const createLeave = async (data: Partial<ILeave>) => {

    return Leave.create(data);
}

export const getleaveById = async (leaveId: string) => {
    return Leave.findById(leaveId)
}


export const getAllLeaves = async () => {
    return Leave.find().populate("employee", "name email").populate("approvedBy", "name email").sort({ createdAt: -1 })
}

export const getLeaveByEmployee = async (employeeId: string) => {
    return Leave.find({
        employee: new Types.ObjectId(employeeId),
    }).sort({ createdAt: -1 })
}

export const approveLeave = async (leaveId: string, approvedBy: Types.ObjectId) => {
    return Leave.findByIdAndUpdate(leaveId, {
        status: LEAVE_STATUS.APPROVED,
        approvedBy,
        rejectionReason: null
    }, {
        new: true,
        runValidators: true
    })

}

export const rejectLeave = async (leaveId: string,
    approvedBy: Types.ObjectId, rejectionReason: string
) => {
    return Leave.findByIdAndUpdate(
        leaveId, {
        status: "rejected",
        approvedBy,
        rejectionReason
    }, {
        new: true,
        runValidators: true
    }
    )

}