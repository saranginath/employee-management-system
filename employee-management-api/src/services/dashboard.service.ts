import {
  getTotalEmployees,
  getEmployeeStatus,
  getTotalDepartments,
  getPendingLeaves,
  getTodayAttendance,
  getEmployeeGrowth,
  getDepartmentStats,
} from "../repositories/dashboard.repository";

export const getAdminDashboardService = async () => {
  const totalEmployees = await getTotalEmployees();

  const employeeStatus = await getEmployeeStatus();
  console.log(employeeStatus);

  const totalDepartments = await getTotalDepartments();

  const pendingLeaves = await getPendingLeaves();

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const attendance = await getTodayAttendance(today);

  const attendanceRate =
    attendance.total === 0
      ? 0
      : Math.round((attendance.present / attendance.total) * 100);

  const employeeGrowth = await getEmployeeGrowth();

  const departmentStats = await getDepartmentStats();

  return {
    employees: {
      total: totalEmployees,

      active: employeeStatus[0]?.active || 0,

      inactive: employeeStatus[0]?.inactive || 0,
    },

    departments: {
      total: totalDepartments,
    },

    leaves: {
      pending: pendingLeaves,
    },

    attendance: {
      present: attendance.present,

      absent: attendance.total - attendance.present,

      rate: attendanceRate,
    },

    employeeGrowth,

    departmentStats,
  };
};
