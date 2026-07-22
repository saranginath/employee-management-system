import Employee from "../models/employee.model";
import User from "../models/user.model";
import Attendance from "../models/attendance.model";
import Leave from "../models/leave.model";

export const getManagerProfile = async (userId: string) => {
  return await Employee.findOne({
    user: userId,
  }).populate("department", "name code");
};

export const getTeamMembers = async (departmentId: string) => {
  return Employee.aggregate([
    {
      $match: {
        department: departmentId,
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },

    {
      $unwind: "$user",
    },

    {
      $match: {
        "user.role": "employee",
      },
    },

    {
      $group: {
        _id: null,

        total: {
          $sum: 1,
        },

        active: {
          $sum: {
            $cond: ["$user.isActive", 1, 0],
          },
        },

        inactive: {
          $sum: {
            $cond: ["$user.isActive", 0, 1],
          },
        },
      },
    },
  ]);
};

export const getTeamAttendance = async (departmentId: string) => {
  const employees = await Employee.find({
    department: departmentId,
  }).select("_id");

  const employeeIds = employees.map((emp) => emp._id);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const present = await Attendance.countDocuments({
    employee: {
      $in: employeeIds,
    },

    date: {
      $gte: today,
    },

    status: "present",
  });

  const total = await Attendance.countDocuments({
    employee: {
      $in: employeeIds,
    },

    date: {
      $gte: today,
    },
  });

  return {
    present,

    absent: total - present,

    total,
  };
};

export const getPendingLeaveRequests = async (departmentId: string) => {
  const employees = await Employee.find({
    department: departmentId,
  }).select("_id");

  const employeeIds = employees.map((emp) => emp._id);

  return Leave.countDocuments({
    employee: {
      $in: employeeIds,
    },

    status: "pending",
  });
};

export const getDepartmentEmployeeGrowth = async (departmentId: string) => {
  return Employee.aggregate([
    {
      $match: {
        department: departmentId,
      },
    },

    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },

          year: {
            $year: "$createdAt",
          },
        },

        employees: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
};
