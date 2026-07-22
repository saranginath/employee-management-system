import { Types } from "mongoose";
import { createAttendance, findTodayAttendance, updateAttendance } from "./attendance.repository"
import { AppError } from "../../utils/AppError";

export const checkInService = async (employeeId: string, data: { location?: string }) => {
    const existingAttendance = await findTodayAttendance(employeeId);
    if (existingAttendance) {
        throw new AppError("Already checkied in today", 409)
    }
    return createAttendance({
        employee: new Types.ObjectId(employeeId),
        date: new Date(),
        checkIn: new Date(),
        status: "present",
        location: data.location
    })
}

export const checkOutService = async (employeeId: string) => {
    const attendance = await findTodayAttendance(employeeId);
    if (!attendance) {
        throw new Error("You have not checked in today.");
    }
    if (attendance?.checkOut) {
        throw new AppError("You have already checked out today.", 409)
    }
    const checkoutTime = new Date();
    const workingHours = (checkoutTime.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60)
    return updateAttendance(attendance?._id.toString(), {
        checkOut: checkoutTime,
        workingHours: Number(workingHours.toFixed(2))
    })
}