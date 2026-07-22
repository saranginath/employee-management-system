import {
  getEmployeeByUserId,
  getTodayAttendance,
  getAttendanceSummary,
  getLeaveSummary,
  getRecentLeaves,
} from "../repositories/employeeDashboard.repository";

export const getEmployeeDashboardService = async (userId: string) => {
  const employee = await getEmployeeByUserId(userId);

  if (!employee) {
    throw new Error("Employee profile not found");
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayAttendance = await getTodayAttendance(
    employee._id.toString(),
    today,
  );

  const attendance = await getAttendanceSummary(employee._id.toString());

  const leaves = await getLeaveSummary(employee._id.toString());

  const recentLeaves = await getRecentLeaves(employee._id.toString());

  return {
    profile: {
      name: `${employee.firstName} ${employee.lastName}`,

      email: employee.email,

      designation: employee.designation,

      department: employee.department,
    },

    attendance: {
      percentage: attendance.percentage,

      today: todayAttendance,
    },

    leaves: {
      pending: leaves.pending,

      approved: leaves.approved,
    },

    recentLeaves,
  };
};
