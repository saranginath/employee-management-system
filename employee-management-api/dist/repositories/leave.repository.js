"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectLeave = exports.approveLeave = exports.getLeaveByEmployee = exports.getAllLeaves = exports.getleaveById = exports.createLeave = void 0;
const mongoose_1 = require("mongoose");
const leave_model_1 = require("../models/leave.model");
const constants_1 = require("../constants");
const createLeave = async (data) => {
    return leave_model_1.Leave.create(data);
};
exports.createLeave = createLeave;
const getleaveById = async (leaveId) => {
    return leave_model_1.Leave.findById(leaveId);
};
exports.getleaveById = getleaveById;
const getAllLeaves = async () => {
    return leave_model_1.Leave.find().populate("employee", "name email").populate("approvedBy", "name email").sort({ createdAt: -1 });
};
exports.getAllLeaves = getAllLeaves;
const getLeaveByEmployee = async (employeeId) => {
    return leave_model_1.Leave.find({
        employee: new mongoose_1.Types.ObjectId(employeeId),
    }).sort({ createdAt: -1 });
};
exports.getLeaveByEmployee = getLeaveByEmployee;
const approveLeave = async (leaveId, approvedBy) => {
    return leave_model_1.Leave.findByIdAndUpdate(leaveId, {
        status: constants_1.LEAVE_STATUS.APPROVED,
        approvedBy,
        rejectionReason: null
    }, {
        new: true,
        runValidators: true
    });
};
exports.approveLeave = approveLeave;
const rejectLeave = async (leaveId, approvedBy, rejectionReason) => {
    return leave_model_1.Leave.findByIdAndUpdate(leaveId, {
        status: "rejected",
        approvedBy,
        rejectionReason
    }, {
        new: true,
        runValidators: true
    });
};
exports.rejectLeave = rejectLeave;
