import { IAttendance } from "./attendance.types";
import Attendance from "./attendance.model";

export const findTodayAttendance = async (employeeId: string) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date()
    end.setHours(23, 59, 59, 999);
    return Attendance.findOne({
        employee: employeeId,
        date: {
            $gte: start,
            $lte: end
        }
    })

}

export const createAttendance = async (data: Partial<IAttendance>) => {
    return Attendance.create(data)
}

export const updateAttendance = async (attendanceId: string,
    data: Partial<{ checkOut: Date; workingHours: number; }>
) => {
    return Attendance.findByIdAndUpdate(attendanceId, data, {
        runValidators: true,
        new: true
    })
}