"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectLeaveService = exports.approveLeaveService = exports.getLeaveSerive = exports.createLeaveService = void 0;
const mongoose_1 = require("mongoose");
const leave_repository_1 = require("../repositories/leave.repository");
const constants_1 = require("../constants");
const AppError_1 = require("../utils/AppError");
const createLeaveService = async (employeeId, data) => {
    const leaveData = {
        employee: employeeId,
        ...data,
    };
    const leave = await (0, leave_repository_1.createLeave)(leaveData);
    return leave;
};
exports.createLeaveService = createLeaveService;
const getLeaveSerive = async (employeeId, role) => {
    if (role === constants_1.ROLES.ADMIN || constants_1.ROLES.MANAGER) {
        return (0, leave_repository_1.getAllLeaves)();
    }
    return (0, leave_repository_1.getLeaveByEmployee)(employeeId);
};
exports.getLeaveSerive = getLeaveSerive;
const approveLeaveService = async (leaveId, approverId) => {
    const leave = await (0, leave_repository_1.getleaveById)(leaveId);
    if (!leave) {
        throw new AppError_1.AppError("leave request not found", 409);
    }
    return (0, leave_repository_1.approveLeave)(leaveId, new mongoose_1.Types.ObjectId(approverId));
};
exports.approveLeaveService = approveLeaveService;
const rejectLeaveService = async (leaveId, approverId, reason) => {
    const leave = await (0, leave_repository_1.getleaveById)(leaveId);
    if (!leave) {
        throw new AppError_1.AppError("Leave request not found", 404);
    }
    if (leave.status !== "pending") {
        throw new Error("Leave request has already been processed");
    }
    return (0, leave_repository_1.rejectLeave)(leaveId, new mongoose_1.Types.ObjectId(approverId), reason);
};
exports.rejectLeaveService = rejectLeaveService;
