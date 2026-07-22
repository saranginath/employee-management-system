import Employee from "../models/employee.model";
import Attendance from "../models/attendance.model";
import Leave from "../models/leave.model";

export const getEmployeeByUserId = async (
    userId: string
) => {

    return Employee.findOne({
        user: userId
    })
        .populate(
            "department",
            "name"
        );

};




export const getTodayAttendance =
    async (
        employeeId: string,
        today: Date
    ) => {


        return Attendance.findOne({

            employee: employeeId,

            date: {
                $gte: today
            }

        });

    };




export const getAttendanceSummary =
    async (
        employeeId: string
    ) => {


        const total =
            await Attendance.countDocuments({
                employee: employeeId
            });



        const present =
            await Attendance.countDocuments({

                employee: employeeId,

                status: "present"

            });



        const percentage =
            total === 0
                ? 0
                :
                Math.round(
                    (present / total) * 100
                );


        return {

            total,
            present,
            percentage

        };


    };





export const getLeaveSummary =
    async (
        employeeId: string
    ) => {


        const pending =
            await Leave.countDocuments({

                employee: employeeId,

                status: "pending"

            });



        const approved =
            await Leave.countDocuments({

                employee: employeeId,

                status: "approved"

            });



        return {

            pending,
            approved

        };


    };





export const getRecentLeaves =
    async (
        employeeId: string
    ) => {


        return Leave.find({

            employee: employeeId

        })
            .sort({
                createdAt: -1
            })
            .limit(5);

    };