"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaveCalendarController = exports.getLeaveHistoryController = exports.getLeaveBalanceController = exports.getPendingLeaveController = exports.rejectLeaveController = exports.approveleaveController = exports.cancelLeaveController = exports.updateLeaveController = exports.getLeaveController = exports.createLeaveController = void 0;
const leave_validator_1 = require("../validators/leave.validator");
const leave_service_1 = require("../services/leave.service");
const asyncHandler_1 = require("../middleware/asyncHandler");
const mongoose_1 = require("mongoose");
exports.createLeaveController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = leave_validator_1.createLeaveSchema.parse(req.body);
    const leave = await (0, leave_service_1.createLeaveService)(new mongoose_1.Types.ObjectId(req.user.id), data);
    res.status(201).json({
        success: true,
        message: "Leave created successfully",
        data: leave,
    });
});
exports.getLeaveController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const leave = await (0, leave_service_1.getLeaveService)(req.user.id, req.user.role);
    res.status(200).json({
        success: true,
        data: leave,
    });
});
exports.updateLeaveController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = leave_validator_1.updateLeaveSchema.parse(req.body);
    const leave = await (0, leave_service_1.updateLeaveService)(req.params.id, req.user.id, data);
    res.status(200).json({
        success: true,
        message: "Leave request updated successfully",
        data: leave,
    });
});
exports.cancelLeaveController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const leave = await (0, leave_service_1.cancelLeaveService)(req.params.id, req.user.id);
    res.status(200).json({
        success: true,
        message: "Leave request cancelled successfully",
        data: leave,
    });
});
exports.approveleaveController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const leave = await (0, leave_service_1.approveLeaveService)(req.params.id, req.user.id);
    res.status(200).json({
        success: true,
        message: "Leave approved successfully",
        data: leave,
    });
});
exports.rejectLeaveController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = leave_validator_1.rejectLeaveSchema.parse(req.body);
    const leave = await (0, leave_service_1.rejectLeaveService)(req.params.id, req.user.id, data.reason);
    res.status(200).json({
        success: true,
        message: "Leave rejected successfully",
        data: leave,
    });
});
exports.getPendingLeaveController = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const leaves = await (0, leave_service_1.getPendingLeaveService)();
    res.status(200).json({
        success: true,
        data: leaves,
    });
});
exports.getLeaveBalanceController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const balance = await (0, leave_service_1.getLeaveBalanceService)(req.user.id);
    res.status(200).json({
        success: true,
        data: balance,
    });
});
exports.getLeaveHistoryController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const history = await (0, leave_service_1.getLeaveHistoryService)(req.user.id);
    res.status(200).json({
        success: true,
        data: history,
    });
});
exports.getLeaveCalendarController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const calendar = await (0, leave_service_1.getLeaveCalendarService)(req.user.id, req.user.role);
    res.status(200).json({
        success: true,
        data: calendar,
    });
});
