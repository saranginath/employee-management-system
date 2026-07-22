const LeaveStatus = ({ status }: { status: string }) => {
  const colors: any = {
    approved: "bg-green-100 text-green-700",

    pending: "bg-yellow-100 text-yellow-700",

    rejected: "bg-red-100 text-red-700",

    cancelled: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-3 py-1 rounded ${colors[status]}`}>{status}</span>
  );
};

export default LeaveStatus;
