import Employee from "../models/employee.model";
import Department from "../models/department.model";
import Leave from "../models/leave.model";
import Attendance from "../models/attendance.model";



export const getTotalEmployees = async () => {

    return Employee.countDocuments();

};



export const getEmployeeStatus = async () => {
    return Employee.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $match: {
                "user.role": "employee"
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: 1
                },
                active: {
                    $sum: {
                        $cond: [
                            { $eq: ["$user.isActive", true] },
                            1,
                            0
                        ]
                    }
                },
                inactive: {
                    $sum: {
                        $cond: [
                            { $eq: ["$user.isActive", false] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]);
};



export const getTotalDepartments =
    async () => {

        return Department.countDocuments();

    };




export const getPendingLeaves =
    async () => {

        return Leave.countDocuments({
            status: "pending"
        });

    };





export const getTodayAttendance =
    async (today: Date) => {


        const present =
            await Attendance.countDocuments({

                date: {
                    $gte: today
                },

                status: "present"

            });



        const total =
            await Attendance.countDocuments({

                date: {
                    $gte: today
                }

            });



        return {
            present,
            total
        };

    };






export const getEmployeeGrowth =
    async () => {


        return Employee.aggregate([

            {
                $group: {

                    _id: {

                        month: {
                            $month: "$createdAt"
                        },

                        year: {
                            $year: "$createdAt"
                        }

                    },


                    employees: {
                        $sum: 1
                    }

                }
            },


            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }

        ]);


    };






export const getDepartmentStats =
    async () => {


        return Employee.aggregate([


            {
                $lookup: {
                    from: "departments",
                    localField: "department",
                    foreignField: "_id",
                    as: "department"
                }
            },


            {
                $unwind: "$department"
            },


            {
                $group: {

                    _id: "$department.name",

                    employees: {
                        $sum: 1
                    }

                }

            }


        ]);


    };