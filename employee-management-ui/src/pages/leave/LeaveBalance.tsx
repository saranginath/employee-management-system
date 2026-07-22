import { useGetLeaveBalanceQuery } from "../../features/leave/leaveApi";

import LeaveCard from "../../components/leave/LeaveCard";

const LeaveBalance = () => {
  const { data } = useGetLeaveBalanceQuery();

  const balance = data?.data || {};

  return (
    <div>
      <h1
        className="
text-3xl
font-bold
mb-6
"
      >
        Leave Balance
      </h1>

      <div
        className="
grid
md:grid-cols-2
xl:grid-cols-4
gap-6
"
      >
        {Object.entries(balance).map(([type, value]: any) => (
          <LeaveCard
            key={type}

            type={type}

            allowed={value.allowed}

            used={value.used}

            remaining={value.remaining}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;
