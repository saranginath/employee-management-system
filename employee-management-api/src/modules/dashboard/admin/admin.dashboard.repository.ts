// src/modules/dashboard/admin/admin.dashboard.repository.ts

import Employee from "../../employee/employee.model";
import Department from "../../department/department.model";
import Leave from "../../leave/leave.model";
import Attendance from "../../attendance/attendance.model";


export const getTotalEmployees = async () => {

    return Employee.countDocuments();

};



export const getActiveEmployees = async () => {

    return Employee.countDocuments({
        status: "active"
    });

};



export const getTotalDepartments = async () => {

    return Department.countDocuments();

};



export const getPendingLeaves = async () => {

    return Leave.countDocuments({
        status: "pending"
    });

};



export const getTodayAttendance = async () => {


    const startOfDay = new Date();

    startOfDay.setHours(
        0,
        0,
        0,
        0
    );


    const endOfDay = new Date();

    endOfDay.setHours(
        23,
        59,
        59,
        999
    );


    return Attendance.countDocuments({

        createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
        }

    });

};



export const getRecentEmployees = async () => {


    return Employee.find()

        .sort({
            createdAt: -1
        })

        .limit(5)

        .select(
            "firstName lastName email designation department"
        )

        .populate(
            "department",
            "name"
        );


};