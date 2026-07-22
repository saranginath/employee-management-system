import {
    FiGrid,
    FiUsers,
    FiClock,
    FiCalendar,
    FiTrendingUp,
    FiBarChart2,
    FiBell,
    FiFolder,
    FiUserCheck,
    FiFileText,
    FiBriefcase,
    FiMessageSquare,
    FiSettings,
} from "react-icons/fi";

export const managerMenu = [
    // Dashboard
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: FiGrid,
    },

    // Team Management
    {
        name: "My Team",
        path: "/team",
        icon: FiUsers,
    },

    {
        name: "Team Attendance",
        path: "/team-attendance",
        icon: FiUserCheck,
    },

    // Attendance & Shift
    {
        name: "Attendance",
        path: "/attendance",
        icon: FiClock,
    },

    {
        name: "Shift Management",
        path: "/shifts",
        icon: FiClock,
    },

    // Leave
    {
        name: "Leave Approval",
        path: "/dashboard/leaves/manage",
        icon: FiCalendar,
    },

    // Performance
    {
        name: "Performance",
        path: "/performance",
        icon: FiTrendingUp,
    },

    // Reports
    {
        name: "Team Reports",
        path: "/reports",
        icon: FiBarChart2,
    },

    // Documents
    {
        name: "Team Documents",
        path: "/documents",
        icon: FiFolder,
    },

    // Communication
    {
        name: "Announcements",
        path: "/announcements",
        icon: FiBell,
    },

    {
        name: "Messages",
        path: "/messages",
        icon: FiMessageSquare,
    },

    // Employee Requests
    {
        name: "Employee Requests",
        path: "/employee-requests",
        icon: FiFileText,
    },

    // Department
    {
        name: "Department Info",
        path: "/department",
        icon: FiBriefcase,
    },

    // Settings
    {
        name: "Settings",
        path: "/settings",
        icon: FiSettings,
    },
];
