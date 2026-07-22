import {
  FiGrid,
  FiUsers,
  FiLayers,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiBarChart2,
  FiUserPlus,
  FiTrendingUp,
  FiShield,
  FiFileText,
  FiFolder,
  FiSettings,
  FiBriefcase,
  FiUserCheck,
  FiAward,
  FiDatabase,
  FiBell,
  FiMessageSquare,
  FiActivity,
  FiMapPin,
} from "react-icons/fi";

export const adminMenu = [
  // Dashboard
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiGrid,
  },

  // Employee Management
  {
    name: "Employees",
    path: "/dashboard/employees",
    icon: FiUsers,
  },

  {
    name: "Employee Directory",
    path: "/employee-directory",
    icon: FiUserCheck,
  },

  // Organization
  {
    name: "Departments",
    path: "/dashboard/departments",
    icon: FiLayers,
  },

  {
    name: "Designations",
    path: "/dashboard/designations",
    icon: FiBriefcase,
  },

  {
    name: "Locations",
    path: "/dashboard/locations",
    icon: FiMapPin,
  },

  // Attendance
  {
    name: "Attendance",
    path: "/dashboard/attendance",
    icon: FiClock,
  },

  {
    name: "Shift Management",
    path: "/dashboard/shifts",
    icon: FiActivity,
  },

  // Leave
  {
    name: "Leave Management",
    path: "/dashboard/leaves/manage",
    icon: FiCalendar,
  },

  // Payroll
  {
    name: "Payroll",
    path: "/dashboard/payroll",
    icon: FiDollarSign,
  },

  {
    name: "Salary Structure",
    path: "/dashboard/salary-structure",
    icon: FiDatabase,
  },

  // Recruitment
  {
    name: "Recruitment",
    path: "/dashboard/recruitment",
    icon: FiUserPlus,
  },

  // Performance
  {
    name: "Performance",
    path: "/dashboard/performance",
    icon: FiTrendingUp,
  },

  {
    name: "Training & Development",
    path: "/dashboard/training",
    icon: FiAward,
  },

  // Reports
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: FiBarChart2,
  },

  // Roles & Security
  {
    name: "Roles & Permissions",
    path: "/dashboard/roles",
    icon: FiShield,
  },

  // Documents
  {
    name: "Documents",
    path: "/dashboard/documents",
    icon: FiFolder,
  },

  // Communication
  {
    name: "Announcements",
    path: "/dashboard/announcements",
    icon: FiBell,
  },

  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: FiMessageSquare,
  },

  // Audit
  {
    name: "Audit Logs",
    path: "/dashboard/audit-logs",
    icon: FiFileText,
  },

  // System
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: FiSettings,
  },
];
