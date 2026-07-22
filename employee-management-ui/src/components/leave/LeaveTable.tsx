import LeaveStatus from "./LeaveStatus";

const LeaveTable = ({ leaves }: any) => {
  return (
    <table className="w-full mt-5">
      <thead>
        <tr className="border-b">
          <th>Type</th>

          <th>Date</th>

          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {leaves?.map((leave: any) => (
          <tr key={leave._id} className="border-b">
            <td>{leave.type}</td>

            <td>
              {leave.startDate}-{leave.endDate}
            </td>

            <td>
              <LeaveStatus status={leave.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveTable;
