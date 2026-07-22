interface Props {
    status: "pending" | "approved" | "rejected" | "cancelled";
}

const LeaveStatusBadge = ({ status }: Props) => {
    const styles: Record<Props["status"], string> = {
        approved: "border border-emerald-200 bg-emerald-50 text-emerald-700",
        pending: "border border-amber-200 bg-amber-50 text-amber-700",
        rejected: "border border-rose-200 bg-rose-50 text-rose-700",
        cancelled: "border border-slate-200 bg-slate-100 text-slate-700",
    };

    return (
        <span
            className={`
        inline-flex min-w-24 items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize tracking-wide ${styles[status]}
      `}
        >
            {status}
        </span>
    );
};

export default LeaveStatusBadge;
