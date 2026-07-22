import {
    FiHome,
    FiUsers,
    FiCalendar,
    FiFileText,
    FiBell,
} from "react-icons/fi";

export const managerMenu = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },

    { name: "My Team", path: "/dashboard/team", icon: FiUsers },

    { name: "Attendance", path: "/dashboard/team-attendance", icon: FiCalendar },

    { name: "Leave Approval", path: "/dashboard/leave-approval", icon: FiFileText },

    { name: "Announcements", path: "/dashboard/announcements", icon: FiBell },
];