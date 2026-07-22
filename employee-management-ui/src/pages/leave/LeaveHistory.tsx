import {
  useGetLeavesQuery,
  useCancelLeaveMutation,
} from "../../features/leave/leaveApi";

import LeaveStatus from "../../components/leave/LeaveStatus";

const LeaveHistory = () => {
  const { data, isLoading, isError } = useGetLeavesQuery();

  const [cancelLeave] = useCancelLeaveMutation();

  const handleCancel = async (id: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this leave?",
    );

    if (!confirmCancel) return;

    await cancelLeave(id);
  };

  if (isLoading) {
    return <div className="p-6">Loading leaves...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load leaves</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leave History</h1>
      </div>

      <div
        className="
                mt-6
                bg-white
                rounded-xl
                shadow
                overflow-hidden
            "
      >
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Type</th>

              <th className="p-4 text-left">From</th>

              <th className="p-4 text-left">To</th>

              <th className="p-4 text-left">Reason</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.map((leave) => (
              <tr
                key={leave._id}
                className="
                            border-b
                            hover:bg-gray-50
                            "
              >
                <td className="p-4 capitalize">{leave.type}</td>

                <td className="p-4">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>

                <td className="p-4">{leave.reason}</td>

                <td className="p-4">
                  <LeaveStatus status={leave.status} />
                </td>

                <td className="p-4">
                  {leave.status === "pending" && (
                    <button
                      onClick={() => handleCancel(leave._id)}

                      className="
                                    bg-red-500
                                    text-white
                                    px-3
                                    py-1
                                    rounded
                                    hover:bg-red-600
                                    "
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
