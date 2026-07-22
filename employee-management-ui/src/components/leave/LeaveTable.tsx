import type { Leave } from "../../features/leave/types";
import LeaveStatusBadge from "./LeaveStatusBadge";

interface Props {
  leaves?: Leave[];
  onEdit: (leave: Leave) => void;
  onCancel: (leaveId: string) => void;
  cancellingId?: string;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const LeaveTable = ({
  leaves = [],
  onEdit,
  onCancel,
  cancellingId,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Leave Type
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Duration
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Days
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {leaves.map((leave) => (
            <tr key={leave._id} className="transition hover:bg-indigo-50/40">
              <td className="px-4 py-4">
                <p className="font-semibold capitalize text-slate-800">{leave.type}</p>
                <p className="text-xs text-slate-500">Leave request</p>
              </td>

              <td className="px-4 py-4 text-sm text-slate-600">
                {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
              </td>

              <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                {getDuration(leave.startDate, leave.endDate)} day
                {getDuration(leave.startDate, leave.endDate) > 1 ? "s" : ""}
              </td>

              <td className="px-4 py-4">
                <LeaveStatusBadge status={leave.status} />
              </td>

              <td className="px-4 py-4">
                {leave.status === "pending" ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(leave)}
                      className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => onCancel(leave._id)}
                      disabled={cancellingId === leave._id}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
                    >
                      {cancellingId === leave._id ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
