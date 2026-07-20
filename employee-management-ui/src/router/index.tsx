import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Employee from "../pages/employee/Employee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,

        children: [
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

                            {
                                path: "employees",
                                element: <Employee />
                            },

                            {
                                path: "employees/:id",
                                element: <EmployeeDetails />
                            }

                        ]
                    }

                ]
            }

        ]
    }
]);