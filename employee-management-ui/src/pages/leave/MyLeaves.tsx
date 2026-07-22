import { useState } from "react";
import toast from "react-hot-toast";

import {
  useCancelLeaveMutation,
  useGetLeaveHistoryQuery,
  useUpdateLeaveMutation,
} from "../../features/leave/leaveApi";
import type { Leave } from "../../features/leave/types";

import LeaveTable from "../../components/leave/LeaveTable";
import LeaveForm from "../../components/leave/LeaveForm";

import LeaveFilter from "../../components/leave/LeaveFilter";

import LeaveEmptyState from "../../components/leave/LeaveEmptyState";

const MyLeaves = () => {
  const [filter, setFilter] = useState("");
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const { data, isLoading } = useGetLeaveHistoryQuery(undefined);
  const [cancelLeave] = useCancelLeaveMutation();
  const [updateLeave, { isLoading: isUpdating }] = useUpdateLeaveMutation();

  const allLeaves: Leave[] = data?.data || [];

  const leaves = filter
    ? allLeaves.filter((item) => item.status === filter)
    : allLeaves;

  const counts = allLeaves.reduce(
    (acc, item) => {
      acc[item.status] += 1;
      return acc;
    },
    {
      pending: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0,
    },
  );

  const statItems = [
    {
      title: "Pending",
      value: counts.pending,
      tone: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      title: "Approved",
      value: counts.approved,
      tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Rejected",
      value: counts.rejected,
      tone: "bg-rose-50 text-rose-700 border-rose-100",
    },
    {
      title: "Cancelled",
      value: counts.cancelled,
      tone: "bg-slate-100 text-slate-700 border-slate-200",
    },
  ];

  const handleCancel = async (leaveId: string) => {
    const shouldCancel = window.confirm(
      "Are you sure you want to cancel this leave request?",
    );

    if (!shouldCancel) return;

    try {
      setCancellingId(leaveId);
      await cancelLeave(leaveId).unwrap();
      toast.success("Leave request cancelled");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message ===
          "string"
          ? (error as { data: { message: string } }).data.message
          : "Failed to cancel leave";
      toast.error(message);
    } finally {
      setCancellingId(null);
    }
  };

  const handleUpdate = async (formData: {
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
  }) => {
    if (!editingLeave) return;

    try {
      await updateLeave({
        id: editingLeave._id,
        data: formData,
      }).unwrap();
      toast.success("Leave request updated");
      setEditingLeave(null);
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message ===
          "string"
          ? (error as { data: { message: string } }).data.message
          : "Failed to update leave";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6 pb-4">
      <div className="rounded-2xl bg-linear-to-r from-sky-600 to-indigo-600 p-6 text-white shadow-md">
        <h1 className="text-3xl font-bold">My Leaves</h1>
        <p className="mt-1 text-sm text-sky-100">
          Review your requests, track statuses, and check your leave history.
        </p>

        <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span className="text-sm font-medium text-sky-100">Filter by status</span>
          <LeaveFilter value={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {statItems.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl border p-4 shadow-sm ${item.tone}`}
          >
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-1 text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Leave Requests</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {leaves.length} {leaves.length === 1 ? "request" : "requests"}
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
          </div>
        ) : leaves.length === 0 ? (
          <LeaveEmptyState />
        ) : (
          <LeaveTable
            leaves={leaves}
            onEdit={setEditingLeave}
            onCancel={handleCancel}
            cancellingId={cancellingId ?? undefined}
          />
        )}
      </div>

      {editingLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Update Leave</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Edit your pending leave request and save changes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingLeave(null)}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <LeaveForm
              initialData={{
                type: editingLeave.type,
                startDate: editingLeave.startDate.slice(0, 10),
                endDate: editingLeave.endDate.slice(0, 10),
                reason: editingLeave.reason,
              }}
              onSubmit={handleUpdate}
              loading={isUpdating}
              submitLabel="Update Request"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLeaves;
