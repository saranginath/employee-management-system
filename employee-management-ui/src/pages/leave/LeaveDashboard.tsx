import { useGetLeavesQuery } from "../../features/leave/leaveApi";
import LeaveTable from "../../components/leave/LeaveTable";

const LeaveDashboard = () => {
  const { data, isLoading } = useGetLeavesQuery();

  const leaveSummary = [
    { title: "Annual Leave", remaining: "15 Remaining" },
    { title: "Sick Leave", remaining: "8 Remaining" },
    { title: "Casual Leave", remaining: "10 Remaining" },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Leave Management</h1>

      <div className="grid grid-cols-3 gap-5 mt-6">
        {leaveSummary.map(({ title, remaining }) => (
          <div key={title} className="bg-white shadow p-5 rounded">
            <h3>{title}</h3>
            <p>{remaining}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-bold">Leave History</h2>

      <LeaveTable leaves={data?.data} />
    </div>
  );
};

export default LeaveDashboard;
