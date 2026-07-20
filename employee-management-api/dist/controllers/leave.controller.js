"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectLeaveController = exports.approveleaveController = exports.getLeaveController = exports.createLeaveController = void 0;
const leave_validator_1 = require("../validators/leave.validator");
const leave_service_1 = require("../services/leave.service");
const asyncHandler_1 = require("../middleware/asyncHandler");
const mongoose_1 = require("mongoose");
const leave_repository_1 = require("../repositories/leave.repository");
exports.createLeaveController = (0, asyncHandler_1.asyncHanlder)(async (req, res) => {
    const data = leave_validator_1.createLeaveSchema.parse(req.body);
    const leave = await (0, leave_service_1.createLeaveService)(new mongoose_1.Types.ObjectId(req.user.id), data);
    res.status(201).json({
        success: true,
        message: "Leave created successfully",
        data: leave
    });
});
exports.getLeaveController = (0, asyncHandler_1.asyncHanlder)(async (req, res) => {
    const leave = await (0, leave_service_1.getLeaveSerive)(req.user.id, req.user.role);
    res.status(200).json({
        success: true,
        data: leave
    });
});
exports.approveleaveController = (0, asyncHandler_1.asyncHanlder)(async (req, res) => {
    const leave = await (0, leave_repository_1.approveLeave)(req.params.id, new mongoose_1.Types.ObjectId(req.user.id));
    console.log(leave);
    res.status(200).json({
        success: true,
        message: "Leave approved successfully",
        data: leave
    });
});
exports.rejectLeaveController = (0, asyncHandler_1.asyncHanlder)(async (req, res) => {
    const data = leave_validator_1.rejectLeaveSchema.parse(req.body);
    const leave = await (0, leave_service_1.rejectLeaveService)(req.params.id, req.user.id, data.reason);
    res.status(200).json({
        success: true,
        message: "Leave rejected successfully",
        data: leave
    });
});
