import { useSelector } from "react-redux";

import type { RootState } from "../../api/store";

import AdminDashboard from "./admin/AdminDashboard";
import ManagerDashboard from "./manager/ManagerDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("AUTH USER:", user);

  if (!user) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const role = user.role?.toLowerCase();

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "manager") {
    return <ManagerDashboard />;
  }

  if (role === "employee") {
    return <EmployeeDashboard />;
  }

  return <div className="p-6">Invalid user role</div>;
};

export default Dashboard;
