import { Types } from "mongoose";
import { ILeave } from "../interfaces/leave.interface"

import { approveLeave, createLeave, getAllLeaves, getLeaveByEmployee, getleaveById, rejectLeave } from "../repositories/leave.repository";
import { ROLES } from "../constants";
import { AppError } from "../utils/AppError";

export const createLeaveService = async (employeeId: Types.ObjectId, data: Partial<ILeave>) => {
    const leaveData = {
        employee: employeeId,
        ...data,
    }
    const leave = await createLeave(leaveData);
    return leave;
}

export const getLeaveSerive = async (employeeId: string,
    role: string
) => {
    if (role === ROLES.ADMIN || ROLES.MANAGER) {
        return getAllLeaves();
    }
    return getLeaveByEmployee(employeeId);
}

export const approveLeaveService = async (leaveId: string, approverId: string) => {
    const leave = await getleaveById(leaveId);
    if (!leave) {
        throw new AppError("leave request not found", 409);
    }
    return approveLeave(leaveId, new Types.ObjectId(approverId))
}

export const rejectLeaveService = async (leaveId: string, approverId: string, reason: string) => {
    const leave = await getleaveById(leaveId);
    if (!leave) {
        throw new AppError("Leave request not found", 404);
    }
    if (leave.status !== "pending") {
        throw new Error("Leave request has already been processed");
    }
    return rejectLeave(leaveId, new Types.ObjectId(approverId), reason)
}