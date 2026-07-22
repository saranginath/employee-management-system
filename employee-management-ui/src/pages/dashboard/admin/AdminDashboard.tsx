import { FiUsers, FiBriefcase, FiCalendar, FiUserCheck } from "react-icons/fi";

import { useGetAdminDashboardQuery } from "../../../features/dashboard/adminDashboardApi";

import StatCard from "../../../components/dashboard/StatCard";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useGetAdminDashboardQuery();

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load dashboard</p>;
  }

  const dashboard = data?.data;

  if (!dashboard) {
    return <p className="p-6">No dashboard data available</p>;
  }

  console.log(dashboard);

  return (
    <div className="p-6 space-y-6">
      <h1
        className="
                text-3xl
                font-bold
            "
      >
        Admin Dashboard 👑
      </h1>

      {/* KPI CARDS */}

      <div
        className="
                grid
                grid-cols-1
                md:grid-cols-4
                gap-5
            "
      >
        <StatCard
          title="Total Employees"

          value={dashboard.employees.total}

          icon={<FiUsers />}
        />

        <StatCard
          title="Active Employees"

          value={dashboard.employees.active}

          icon={<FiUserCheck />}
        />

        <StatCard
          title="Departments"

          value={dashboard.departments.total}

          icon={<FiBriefcase />}
        />

        <StatCard
          title="Pending Leaves"

          value={dashboard.leaves.pending}

          icon={<FiCalendar />}
        />
      </div>

      {/* Attendance Card */}

      <div
        className="
                bg-white
                rounded-xl
                shadow
                p-5
            "
      >
        <h2
          className="
                    font-semibold
                    mb-4
                "
        >
          Attendance Overview
        </h2>

        <div
          className="
                    flex
                    gap-8
                "
        >
          <div>
            <p className="text-gray-500">Present</p>

            <p
              className="
                            text-2xl
                            font-bold
                        "
            >
              {dashboard.attendance.present}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Absent</p>

            <p
              className="
                            text-2xl
                            font-bold
                        "
            >
              {dashboard.attendance.absent}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Rate</p>

            <p
              className="
                            text-2xl
                            font-bold
                        "
            >
              {dashboard.attendance.rate}%
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}

      <div
        className="
                grid
                md:grid-cols-2
                gap-6
            "
      >
        <div
          className="
                    bg-white
                    p-5
                    rounded-xl
                    shadow
                "
        >
          <h2
            className="
                        font-semibold
                        mb-4
                    "
          >
            Employee Growth
          </h2>

          {/* Add Recharts Line Chart here */}

          {dashboard.employeeGrowth?.map((item: any) => (
            <div key={item.month}>
              {item.month} :{item.count}
            </div>
          ))}
        </div>

        <div
          className="
                    bg-white
                    p-5
                    rounded-xl
                    shadow
                "
        >
          <h2
            className="
                        font-semibold
                        mb-4
                    "
          >
            Attendance Overview
          </h2>

          <p>Present: {dashboard.attendance.present}</p>

          <p>Absent: {dashboard.attendance.absent}</p>
        </div>
      </div>

      {/* Department Statistics */}

      <div
        className="
                bg-white
                rounded-xl
                shadow
                p-5
            "
      >
        <h2
          className="
                    font-semibold
                    mb-4
                "
        >
          Department Statistics
        </h2>

        {dashboard.departmentStats?.map((dep: any) => (
          <div
            key={dep.department}
            className="
                                    flex
                                    justify-between
                                    border-b
                                    py-3
                                "
          >
            <span>{dep.department}</span>

            <span>{dep.employees}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}

      <div>
        <h2
          className="
                    text-xl
                    font-bold
                    mb-4
                "
        >
          Quick Actions
        </h2>

        <div
          className="
                    grid
                    grid-cols-2
                    md:grid-cols-5
                    gap-4
                "
        >
          <button
            className="
                        bg-blue-600
                        text-white
                        p-4
                        rounded-lg
                    "
          >
            Create Employee
          </button>

          <button
            className="
                        bg-green-600
                        text-white
                        p-4
                        rounded-lg
                    "
          >
            Create Department
          </button>

          <button
            className="
                        bg-purple-600
                        text-white
                        p-4
                        rounded-lg
                    "
          >
            Manage Roles
          </button>

          <button
            className="
                        bg-orange-600
                        text-white
                        p-4
                        rounded-lg
                    "
          >
            Approve Leaves
          </button>

          <button
            className="
                        bg-gray-700
                        text-white
                        p-4
                        rounded-lg
                    "
          >
            Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
