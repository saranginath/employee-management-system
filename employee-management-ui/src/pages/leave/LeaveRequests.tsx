import {
  useGetPendingLeavesQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
} from "../../features/leave/leaveApi";
import type { Leave } from "../../features/leave/types";

import LeaveStatusBadge from "../../components/leave/LeaveStatusBadge";

const LeaveRequests = () => {
  const { data, isLoading } = useGetPendingLeavesQuery(undefined);
  console.log(data)
  const [approveLeave] = useApproveLeaveMutation();

  const [rejectLeave] = useRejectLeaveMutation();

  const leaves: Leave[] = data?.data || [];

  const handleApprove = async (id: string) => {
    await approveLeave(id);
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason");

    if (!reason) return;

    await rejectLeave({
      id,
      reason,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Leave Requests</h1>

      <div className="bg-white shadow rounded mt-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3">Employee</th>

              <th>Type</th>

              <th>Date</th>

              <th>Reason</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="border-b">
                <td className="p-3">
                  {leave.employee?.firstName} {leave.employee?.lastName}
                </td>

                <td>{leave.type}</td>

                <td>
                  {leave.startDate}-{leave.endDate}
                </td>

                <td>{leave.reason}</td>

                <td>
                  <LeaveStatusBadge status={leave.status} />
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleApprove(leave._id)}

                    className="
                bg-green-600
                text-white
                px-3
                py-1
                rounded
                "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(leave._id)}

                    className="
                bg-red-600
                text-white
                px-3
                py-1
                rounded
                "
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;
