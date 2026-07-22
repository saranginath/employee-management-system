"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOutController = exports.checkInController = void 0;
const asyncHandler_1 = require("../middleware/asyncHandler");
const attendance_validator_1 = require("../validators/attendance.validator");
const attendance_service_1 = require("../services/attendance.service");
exports.checkInController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = attendance_validator_1.checkInSchema.parse(req.body);
    const attendance = await (0, attendance_service_1.checkInService)(req.user.id, data);
    res.status(201).json({
        success: true,
        message: "CheckIn successful",
        data: attendance
    });
});
exports.checkOutController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const attendance = await (0, attendance_service_1.checkOutService)(req.user.id);
    res.status(200).json({
        success: true,
        message: "Check out successfully",
        data: attendance
    });
});
