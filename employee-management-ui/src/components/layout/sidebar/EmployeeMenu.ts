import { FiHome, FiUser, FiCalendar, FiFileText, FiDollarSign, } from "react-icons/fi";

export const employeeMenu = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },

    { name: "My Profile", path: "/dashboard/profile", icon: FiUser },

    { name: "Attendance", path: "/dashboard/my-attendance", icon: FiCalendar },

    { name: "My Leave", path: "/dashboard/my-leave", icon: FiFileText },

    { name: "Payslips", path: "/dashboard/payslips", icon: FiDollarSign },
];