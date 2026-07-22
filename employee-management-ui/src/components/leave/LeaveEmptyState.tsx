import { FiInbox } from "react-icons/fi";

const LeaveEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-14 text-slate-500">
      <div className="rounded-full bg-white p-4 text-slate-400 shadow-sm">
        <FiInbox size={34} />
      </div>
      <p className="mt-4 text-base font-semibold text-slate-700">
        No leave records found
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Try changing the filter or apply for a new leave.
      </p>
    </div>
  );
};

export default LeaveEmptyState;
