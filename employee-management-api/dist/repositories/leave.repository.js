"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeavesForEmployeeCalendar = exports.getLeavesForCalendar = exports.getPendingLeaves = exports.rejectLeave = exports.approveLeave = exports.cancelLeave = exports.updateLeave = exports.getLeaveByEmployee = exports.getAllLeaves = exports.getLeaveById = exports.createLeave = void 0;
const mongoose_1 = require("mongoose");
const leave_model_1 = __importDefault(require("../models/leave.model"));
const leave_constnt_1 = require("../constants/leave.constnt");
const createLeave = async (data) => {
    return leave_model_1.default.create(data);
};
exports.createLeave = createLeave;
const getLeaveById = async (leaveId) => {
    return leave_model_1.default.findById(leaveId);
};
exports.getLeaveById = getLeaveById;
const getAllLeaves = async () => {
    return leave_model_1.default.find()
        .populate("employee", "name email")
        .populate("approvedBy", "name email")
        .sort({ createdAt: -1 });
};
exports.getAllLeaves = getAllLeaves;
const getLeaveByEmployee = async (employeeId) => {
    return leave_model_1.default.find({
        employee: new mongoose_1.Types.ObjectId(employeeId),
    }).sort({ createdAt: -1 });
};
exports.getLeaveByEmployee = getLeaveByEmployee;
const updateLeave = async (leaveId, data) => {
    return leave_model_1.default.findByIdAndUpdate(leaveId, data, {
        new: true,
        runValidators: true,
    });
};
exports.updateLeave = updateLeave;
const cancelLeave = async (leaveId) => {
    return leave_model_1.default.findByIdAndUpdate(leaveId, {
        status: leave_constnt_1.LEAVE_STATUS.CANCELLED,
        rejectionReason: "Cancelled by employee",
    }, {
        new: true,
        runValidators: true,
    });
};
exports.cancelLeave = cancelLeave;
const approveLeave = async (leaveId, approvedBy) => {
    return leave_model_1.default.findByIdAndUpdate(leaveId, {
        status: leave_constnt_1.LEAVE_STATUS.APPROVED,
        approvedBy,
        rejectionReason: null,
    }, {
        new: true,
        runValidators: true,
    });
};
exports.approveLeave = approveLeave;
const rejectLeave = async (leaveId, approvedBy, rejectionReason) => {
    return leave_model_1.default.findByIdAndUpdate(leaveId, {
        status: leave_constnt_1.LEAVE_STATUS.REJECTED,
        approvedBy,
        rejectionReason,
    }, {
        new: true,
        runValidators: true,
    });
};
exports.rejectLeave = rejectLeave;
const getPendingLeaves = async () => {
    return leave_model_1.default.find({ status: leave_constnt_1.LEAVE_STATUS.PENDING })
        .populate("employee", "name email")
        .sort({ createdAt: -1 });
};
exports.getPendingLeaves = getPendingLeaves;
const getLeavesForCalendar = async (startDate, endDate) => {
    return leave_model_1.default.find({
        status: leave_constnt_1.LEAVE_STATUS.APPROVED,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
    })
        .populate("employee", "name email")
        .sort({ startDate: 1 });
};
exports.getLeavesForCalendar = getLeavesForCalendar;
const getLeavesForEmployeeCalendar = async (employeeId, startDate, endDate) => {
    return leave_model_1.default.find({
        employee: new mongoose_1.Types.ObjectId(employeeId),
        status: leave_constnt_1.LEAVE_STATUS.APPROVED,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
    }).sort({ startDate: 1 });
};
exports.getLeavesForEmployeeCalendar = getLeavesForEmployeeCalendar;
