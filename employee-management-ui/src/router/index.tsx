import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import Employee from "../pages/employee/Employee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import EmployeeFormPage from "../pages/employee/EmployeeFormPage";

import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Resetpassword from "../pages/auth/ResetPassword";

import DepartmentList from "../pages/department/DepartmentList";
import CreateDepartment from "../pages/department/CreateDepartment";

import Settings from "../pages/settings/Settings";


// Leave imports
import LeaveDashboard from "../pages/leave/LeaveDashboard";
import ApplyLeave from "../pages/leave/ApplyLeave";
import LeaveRequests from "../pages/leave/LeaveRequests";
import LeaveHistory from "../pages/leave/LeaveHistory";
import Landing from "../features/landing/Landing";
import EditProfile from "../pages/profile/EditProfile";
import ChangePassword from "../pages/profile/ChangePassword";
import Profile from "../pages/profile/Profile";



export const router = createBrowserRouter([

    {
        path: "/",

        element: <RootLayout />,

        errorElement: <ErrorPage />,


        children: [

            {
                path: "/",
                element: <Landing />
            },
            {
                path: "login",
                element: <Login />
            },


            {
                path: "register",
                element: <Register />
            },


            {
                path: "recovery",
                element: <ForgotPassword />
            },


            {
                path: "reset-Password/:token",
                element: <Resetpassword />
            },



            {
                element: <ProtectedRoute />,

                children: [


                    {
                        path: "dashboard",

                        element: <DashboardLayout />,

                        children: [


                            {
                                index: true,
                                element: <Dashboard />
                            },



                            // Employee

                            {
                                path: "employees",
                                element: <Employee />
                            },


                            {
                                path: "employees/create",
                                element: <EmployeeFormPage />
                            },


                            {
                                path: "employees/:id/edit",
                                element: <EmployeeFormPage />
                            },


                            {
                                path: "employees/:id",
                                element: <EmployeeDetails />
                            },



                            // Department

                            {
                                path: "departments",
                                element: <DepartmentList />
                            },


                            {
                                path: "departments/create",
                                element: <CreateDepartment />
                            },


                            {
                                path: "departments/:id/edit",
                                element: <CreateDepartment />
                            },



                            // Settings

                            {
                                path: "settings",
                                element: <Settings />
                            },




                            // =====================
                            // Leave Management
                            // =====================


                            {
                                path: "leaves",

                                element: <LeaveDashboard />

                            },



                            {
                                path: "leaves/apply",

                                element: <ApplyLeave />

                            },



                            {
                                path: "leaves/history",

                                element: <LeaveHistory />

                            },



                            {
                                path: "leaves/requests",

                                element: <LeaveRequests />

                            },


                            {
                                path: "profile",
                                element: <Profile />
                            },


                            {
                                path: "profile/edit",
                                element: <EditProfile />
                            },


                            {
                                path: "profile/change-password",
                                element: <ChangePassword />
                            },





                        ]

                    }

                ]

            }


        ]

    }

]);