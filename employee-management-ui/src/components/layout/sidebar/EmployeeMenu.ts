import {
    FiGrid,
    FiUser,
    FiClock,
    FiCalendar,
    FiDollarSign,
    FiFolder,
    FiBell,
    FiAward,
    FiMessageSquare,
    FiFileText,
    FiSettings
} from "react-icons/fi";


export const employeeMenu = [

    // Dashboard
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: FiGrid
    },


    // Profile
    {
        name: "My Profile",
        path: "/dashboard/profile",
        icon: FiUser
    },


    // Attendance
    {
        name: "My Attendance",
        path: "/dashboard/attendance",
        icon: FiClock
    },


    // Leave
    {
        name: "My Leaves",
        path: "/dashboard/leaves",
        icon: FiCalendar
    },

    {
        name: "Leave Calendar",
        path: "/dashboard/leave-calendar",
        icon: FiCalendar
    },


    // Payroll
    {
        name: "My Payslips",
        path: "/dashboard/payslips",
        icon: FiDollarSign
    },


    // Documents
    {
        name: "My Documents",
        path: "/dashboard/documents",
        icon: FiFolder
    },


    // Performance
    {
        name: "My Performance",
        path: "/dashboard/performance",
        icon: FiAward
    },


    // Communication
    {
        name: "Announcements",
        path: "/dashboard/announcements",
        icon: FiBell
    },

    {
        name: "Messages",
        path: "/dashboard/messages",
        icon: FiMessageSquare
    },


    // Requests
    {
        name: "My Requests",
        path: "/dashboard/requests",
        icon: FiFileText
    }

];