"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOutService = exports.checkInService = void 0;
const mongoose_1 = require("mongoose");
const attendance_repository_1 = require("../repositories/attendance.repository");
const AppError_1 = require("../utils/AppError");
const checkInService = async (employeeId, data) => {
    const existingAttendance = await (0, attendance_repository_1.findTodayAttendance)(employeeId);
    if (existingAttendance) {
        throw new AppError_1.AppError("Already checkied in today", 409);
    }
    return (0, attendance_repository_1.createAttendance)({
        employee: new mongoose_1.Types.ObjectId(employeeId),
        date: new Date(),
        checkIn: new Date(),
        status: "present",
        location: data.location
    });
};
exports.checkInService = checkInService;
const checkOutService = async (employeeId) => {
    const attendance = await (0, attendance_repository_1.findTodayAttendance)(employeeId);
    if (!attendance) {
        throw new Error("You have not checked in today.");
    }
    if (attendance?.checkout) {
        throw new AppError_1.AppError("You have already checked out today.", 409);
    }
    const checkoutTime = new Date();
    const workingHours = (checkoutTime.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);
    return (0, attendance_repository_1.updateAttendance)(attendance?._id.toString(), {
        checkOut: checkoutTime,
        workingHours: Number(workingHours.toFixed(2))
    });
};
exports.checkOutService = checkOutService;
