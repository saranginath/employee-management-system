import Employee from "../models/employee.model";
import Department from "../models/department.model";
import Attendance from "../models/attendance.model";
import Leave from "../models/leave.model";
import Payroll from "../models/payroll.model";





export const getAdminDashboardService = async () => {


    const todayStart = new Date();

    todayStart.setHours(
        0,
        0,
        0,
        0
    );


    const [
        totalEmployees,
        activeEmployees,
        totalDepartments,
        pendingLeaves,
        todayAttendance,
        totalPayrollRecords
    ] = await Promise.all([


        // Total employees
        Employee.countDocuments(),



        // Active employees
        Employee.countDocuments({
            status: "active"
        }),



        // Departments count
        Department.countDocuments(),



        // Pending leave requests
        Leave.countDocuments({

            status: "pending"

        }),



        // Today's attendance
        Attendance.countDocuments({

            checkIn: {
                $gte: todayStart
            }

        }),



        // Payroll records
        Payroll.countDocuments()


    ]);



    return {


        employees: {

            total: totalEmployees,

            active: activeEmployees

        },


        departments: {

            total: totalDepartments

        },


        leaves: {

            pending: pendingLeaves

        },


        attendance: {

            today: todayAttendance

        },


        payroll: {

            records: totalPayrollRecords

        }


    };

};





// =============================
// MANAGER DASHBOARD
// =============================

export const getManagerDashboardService = async (
    managerId: string
) => {


    const manager =
        await Employee.findById(
            managerId
        );



    if (!manager) {

        throw new Error(
            "Manager not found"
        );

    }



    const teamEmployees =
        await Employee.countDocuments({

            department:
                manager.department

        });



    const teamAttendance =
        await Attendance.countDocuments({

            department:
                manager.department

        });



    const pendingLeaves =
        await Leave.countDocuments({

            status: "pending"

        });



    return {


        team: {

            employees:
                teamEmployees

        },


        attendance: {

            today:
                teamAttendance

        },


        leaves: {

            pending:
                pendingLeaves

        }


    };


};





// =============================
// EMPLOYEE DASHBOARD
// =============================

export const getEmployeeDashboardService = async (
    employeeId: string
) => {


    const employee =
        await Employee.findById(
            employeeId
        )
            .select(
                "firstName lastName email designation department"
            )
            .populate(
                "department",
                "name code"
            );



    if (!employee) {

        throw new Error(
            "Employee not found"
        );

    }



    const attendance =
        await Attendance.find({

            employee: employeeId

        })
            .sort({

                createdAt: -1

            })
            .limit(5);





    const leaves =
        await Leave.find({

            employee: employeeId

        })
            .sort({

                createdAt: -1

            })
            .limit(5);





    const payroll =
        await Payroll.findOne({

            employee: employeeId

        })
            .sort({

                createdAt: -1

            });



    return {


        profile: employee,


        attendance: {


            recent: attendance


        },


        leaves: {


            recent: leaves


        },


        payroll


    };


};