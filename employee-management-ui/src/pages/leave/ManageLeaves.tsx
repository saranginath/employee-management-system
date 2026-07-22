import { useState } from "react";
import toast from "react-hot-toast";

import {
    useGetPendingLeavesQuery,
    useApproveLeaveMutation,
    useRejectLeaveMutation,
} from "../../features/leave/leaveApi";
import type { Leave } from "../../features/leave/types";

import LeaveApprovalModal from "../../components/leave/LeaveApprovalModal";

const ManageLeaves = () => {
    const { data, isLoading } = useGetPendingLeavesQuery(undefined);

    const [approve, { isLoading: isApproving }] = useApproveLeaveMutation();

    const [reject] = useRejectLeaveMutation();
    const [selected, setSelected] = useState<string | null>(null);

    const [reason, setReason] = useState("");

    const leaves: Leave[] = data?.data || [];

    const getEmployeeName = (leave: Leave) => {
        const firstName = leave.employee?.firstName?.trim() || "";
        const lastName = leave.employee?.lastName?.trim() || "";
        const fullName = `${firstName} ${lastName}`.trim();

        return fullName || "Employee";
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    const handleApprove = async (leaveId: string) => {
        try {
            await approve(leaveId).unwrap();
            toast.success("Leave approved");
        } catch (error: unknown) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message ===
                    "string"
                    ? (error as { data: { message: string } }).data.message
                    : "Failed to approve leave";
            toast.error(message);
        }
    };

    const handleReject = async () => {
        if (!selected) return;

        try {
            await reject({ id: selected, reason }).unwrap();
            toast.success("Leave rejected");
            setSelected(null);
            setReason("");
        } catch (error: unknown) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message ===
                    "string"
                    ? (error as { data: { message: string } }).data.message
                    : "Failed to reject leave";
            toast.error(message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-linear-to-r from-sky-600 to-indigo-600 p-6 text-white shadow-md">
                <h1 className="text-3xl font-bold">Manage Leaves</h1>
                <p className="mt-1 text-sm text-sky-100">
                    Review pending requests and process leave actions.
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                {isLoading ? (
                    <p className="text-slate-500">Loading pending requests...</p>
                ) : leaves.length === 0 ? (
                    <p className="text-slate-500">No pending leave requests.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="min-w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Employee
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Duration
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Reason
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 bg-white">
                                {leaves.map((leave) => (
                                    <tr key={leave._id} className="transition hover:bg-indigo-50/40">
                                        <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                            {getEmployeeName(leave)}
                                        </td>
                                        <td className="px-4 py-4 text-sm capitalize text-slate-700">
                                            {leave.type}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {leave.reason}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleApprove(leave._id)}
                                                    disabled={isApproving}
                                                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                                                >
                                                    Approve
                                                </button>

                                                {
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelected(leave._id)}
                                                        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                                                    >
                                                        Reject
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <LeaveApprovalModal
                open={!!selected}

                reason={reason}

                setReason={setReason}

                onClose={() => {
                    setSelected(null);
                    setReason("");
                }}

                onConfirm={handleReject}
            />
        </div>
    );
};

export default ManageLeaves;
