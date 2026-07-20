"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttendance = exports.createAttendance = exports.findTodayAttendance = void 0;
const attendance_model_1 = require("../models/attendance.model");
const findTodayAttendance = async (employeeId) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return attendance_model_1.Attendance.findOne({
        employee: employeeId,
        date: {
            $gte: start,
            $lte: end
        }
    });
};
exports.findTodayAttendance = findTodayAttendance;
const createAttendance = async (data) => {
    return attendance_model_1.Attendance.create(data);
};
exports.createAttendance = createAttendance;
const updateAttendance = async (attendanceId, data) => {
    return attendance_model_1.Attendance.findByIdAndUpdate(attendanceId, data, {
        runValidators: true,
        new: true
    });
};
exports.updateAttendance = updateAttendance;
