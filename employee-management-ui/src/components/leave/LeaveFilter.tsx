interface Props {
  value: string;

  onChange: (v: string) => void;
}

const LeaveFilter = ({ value, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 md:w-56"
    >
      <option value="">All Status</option>

      <option value="pending">Pending</option>

      <option value="approved">Approved</option>

      <option value="rejected">Rejected</option>

      <option value="cancelled">Cancelled</option>
    </select>
  );
};

export default LeaveFilter;
