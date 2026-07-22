import {
    FiHome, FiUsers, FiCalendar, FiFileText, FiDollarSign, FiBell,
    FiSettings
} from "react-icons/fi";

export const adminMenu = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },

    { name: "Employees", path: "/dashboard/employees", icon: FiUsers },

    { name: "Departments", path: "/dashboard/departments", icon: FiUsers },

    { name: "Attendance", path: "/dashboard/attendance", icon: FiCalendar },

    { name: "Leaves", path: "/dashboard/leaves", icon: FiFileText },

    { name: "Payroll", path: "/dashboard/payroll", icon: FiDollarSign },

    { name: "Announcements", path: "/dashboard/announcements", icon: FiBell },

    { name: "Settings", path: "/dashboard/settings", icon: FiSettings },
];