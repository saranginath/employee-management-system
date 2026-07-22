import { FiCalendar, FiClock, FiFileText, FiCheckCircle } from "react-icons/fi";
import { useApplyLeaveMutation } from "../../features/leave/leaveApi";
import LeaveForm from "../../components/leave/LeaveForm";

const infoItems = [
    {
        icon: <FiClock size={22} />,
        title: "Quick Approval",
        text: "Manager reviews your request within 24 hours",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: <FiFileText size={22} />,
        title: "Leave History",
        text: "Track all your previous leave requests",
        color: "bg-purple-100 text-purple-600",
    },
    {
        icon: <FiCheckCircle size={22} />,
        title: "Easy Process",
        text: "Apply in just a few seconds",
        color: "bg-emerald-100 text-emerald-600",
    },
];

const ApplyLeave = () => {
    const [applyLeave, { isLoading }] = useApplyLeaveMutation();

    const handleSubmit = async (data: unknown) => {
        try {
            await applyLeave(data).unwrap();
            alert("Leave applied successfully");
        } catch (error: unknown) {
            const msg =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message ===
                    "string"
                    ? (error as { data: { message: string } }).data.message
                    : "Something went wrong";
            alert(msg);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Card */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white flex items-center justify-between shadow-lg">
                    <div>
                        <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-1">
                            Leave Request
                        </p>
                        <h1 className="text-3xl font-bold mb-2">Apply for Leave</h1>
                        <p className="text-blue-100 text-sm max-w-sm">
                            Submit your leave request and track approval status from your
                            dashboard.
                        </p>
                    </div>
                    <div className="hidden md:flex h-20 w-20 rounded-2xl bg-white/20 items-center justify-center shrink-0">
                        <FiCalendar size={40} />
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {infoItems.map(({ icon, title, text, color }) => (
                        <div
                            key={title}
                            className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-slate-100 hover:shadow-md transition"
                        >
                            <div
                                className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}
                            >
                                {icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-sm">
                                    {title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            Leave Details
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Fill in the details below to submit your leave request
                        </p>
                    </div>
                    <LeaveForm onSubmit={handleSubmit} loading={isLoading} />
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;