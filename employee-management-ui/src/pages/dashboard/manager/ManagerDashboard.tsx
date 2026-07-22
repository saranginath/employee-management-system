import {
  FiAlertCircle,
  FiRefreshCw,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
} from "react-icons/fi";

import { useGetManagerDashboardQuery } from "../../../features/dashboard/managerDashbaordApi";

import { getGreeting } from "../../../utils/greeting";

const ManagerDashboard = () => {
  const { data, isLoading, isError, refetch } = useGetManagerDashboardQuery();

  console.log("manager dashboard data:", data);
  console.log("manager dashboard error:", isError);

  const dashboard = data?.data;

  // Loading State

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div
            className="
                    h-36
                    bg-gray-200
                    rounded-2xl
                "
          />

          <div
            className="
                    grid
                    grid-cols-1
                    md:grid-cols-4
                    gap-5
                "
          >
            <div className="h-32 bg-gray-200 rounded-xl" />
            <div className="h-32 bg-gray-200 rounded-xl" />
            <div className="h-32 bg-gray-200 rounded-xl" />
            <div className="h-32 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error State

  if (isError) {
    return (
      <div className="p-6">
        <div
          className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-2xl
                    p-8
                    text-center
                    "
        >
          <FiAlertCircle
            className="
                        mx-auto
                        text-red-500
                        text-4xl
                        "
          />

          <h2
            className="
                        text-xl
                        font-semibold
                        mt-4
                    "
          >
            Unable to load dashboard
          </h2>

          <button
            onClick={refetch}
            className="
                        mt-5
                        px-5
                        py-2
                        bg-blue-600
                        text-white
                        rounded-lg
                        flex
                        items-center
                        gap-2
                        mx-auto
                        hover:bg-blue-700
                        "
          >
            <FiRefreshCw />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
            p-6
            space-y-6
        "
    >
      {/* Header */}

      <div
        className="
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                rounded-2xl
                p-8
                text-white
                shadow-lg
                flex
                justify-between
                items-center
                "
      >
        <div>
          <p
            className="
                        text-blue-100
                        text-sm
                    "
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h1
            className="
                        text-3xl
                        font-bold
                        mt-3
                    "
          >
            {getGreeting()}, {dashboard.profile.name} 👋
          </h1>

          <p
            className="
                        mt-2
                        text-blue-100
                    "
          >
            {dashboard.profile.designation}
          </p>

          <div
            className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        bg-white/20
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        "
          >
            🏢
            {dashboard.profile.department?.name || "No Department"}
          </div>
        </div>

        {/* Avatar */}

        <div
          className="
                    hidden
                    md:flex
                    w-24
                    h-24
                    rounded-full
                    bg-white/20
                    items-center
                    justify-center
                    text-4xl
                    font-bold
                    border
                    border-white/30
                    "
        >
          {dashboard.profile.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Stats */}

      <div
        className="
                grid
                grid-cols-1
                md:grid-cols-4
                gap-5
                "
      >
        <DashboardCard
          title="Total Team"
          value={dashboard.team.total}
          icon={<FiUsers />}
        />

        <DashboardCard
          title="Active Employees"
          value={dashboard.team.active}
          icon={<FiCheckCircle />}
        />

        <DashboardCard
          title="Inactive Employees"
          value={dashboard.team.inactive}
          icon={<FiXCircle />}
        />

        <DashboardCard
          title="Pending Leaves"
          value={dashboard.leaves.pending}
          icon={<FiCalendar />}
        />
      </div>

      {/* Attendance */}

      <div
        className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                p-6
                "
      >
        <h2
          className="
                    text-xl
                    font-semibold
                    mb-5
                "
        >
          Team Attendance
        </h2>

        <div
          className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-5
                    "
        >
          <AttendanceCard
            title="Present"
            value={dashboard.attendance.present}
            style="bg-green-50 text-green-600"
          />

          <AttendanceCard
            title="Absent"
            value={dashboard.attendance.absent}
            style="bg-red-50 text-red-600"
          />

          <AttendanceCard
            title="Total"
            value={dashboard.attendance.total}
            style="bg-blue-50 text-blue-600"
          />
        </div>
      </div>

      {/* Employee Growth */}

      <div
        className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                p-6
                "
      >
        <h2
          className="
                    text-xl
                    font-semibold
                "
        >
          Employee Growth
        </h2>

        {dashboard.employeeGrowth.length === 0 ? (
          <p
            className="
                        text-gray-400
                        mt-4
                    "
          >
            No growth data available
          </p>
        ) : (
          dashboard.employeeGrowth.map((item: any) => (
            <div
              key={item.month}
              className="
                                mt-3
                                text-gray-600
                                "
            >
              {item.month} : {item.count}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon }: any) => {
  return (
    <div
      className="
            bg-white
            rounded-2xl
            border
            shadow-sm
            p-6
            flex
            justify-between
            items-center
            hover:shadow-lg
            transition
            "
    >
      <div>
        <p
          className="
                    text-gray-500
                    text-sm
                "
        >
          {title}
        </p>

        <h2
          className="
                    text-4xl
                    font-bold
                    mt-2
                "
        >
          {value}
        </h2>
      </div>

      <div
        className="
                w-14
                h-14
                rounded-xl
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
                text-3xl
                "
      >
        {icon}
      </div>
    </div>
  );
};

const AttendanceCard = ({ title, value, style }: any) => {
  return (
    <div
      className={`
            rounded-xl
            p-5
            ${style}
            `}
    >
      <p className="font-medium">{title}</p>

      <h3
        className="
                text-3xl
                font-bold
                mt-2
            "
      >
        {value}
      </h3>
    </div>
  );
};

export default ManagerDashboard;
