import { useState } from "react";

interface Props {
    initialData?: {
        type?: string;
        startDate?: string;
        endDate?: string;
        reason?: string;
    };
    onSubmit: (data: {
        type: string;
        startDate: string;
        endDate: string;
        reason: string;
    }) => void;
    loading?: boolean;
    submitLabel?: string;
}

const LeaveForm = ({
    initialData,
    onSubmit,
    loading,
    submitLabel = "Submit Request",
}: Props) => {
    const [form, setForm] = useState({
        type: initialData?.type || "",
        startDate: initialData?.startDate || "",
        endDate: initialData?.endDate || "",
        reason: initialData?.reason || "",
    });

    const change = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
            className="space-y-5"
        >
            <textarea
                name="reason"
                value={form.reason}
                onChange={change}
                placeholder="Reason for leave"
                rows={3}
                required
                className="input w-full resize-none"
            />

            <select
                name="type"
                value={form.type}
                onChange={change}
                required
                className="input w-full"
            >
                <option value="">Select Leave Type</option>
                <option value="casual">Casual</option>
                <option value="sick">Sick</option>
                <option value="earned">Earned</option>
                <option value="unpaid">Unpaid</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={change}
                    required
                    className="input w-full"
                />
                <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={change}
                    required
                    className="input w-full"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
            >
                {loading ? "Submitting..." : submitLabel}
            </button>
        </form>
    );
};

export default LeaveForm;
