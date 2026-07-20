import { FiBriefcase, FiClock, FiUsers } from 'react-icons/fi';

const stats = [
    { title: 'Active Employees', value: '248', icon: <FiUsers />, accent: 'bg-blue-50 text-blue-600' },
    { title: 'Present Today', value: '186', icon: <FiBriefcase />, accent: 'bg-emerald-50 text-emerald-600' },
    { title: 'Pending Leaves', value: '14', icon: <FiClock />, accent: 'bg-amber-50 text-amber-600' },
];

function Dashboard() {
    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-100">Overview</p>
                <h1 className="mt-2 text-3xl font-semibold">Welcome back, Admin</h1>
                <p className="mt-3 max-w-2xl text-sm text-blue-100">
                    Track attendance, manage employees, and keep your team aligned from a single place.
                </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.accent}`}>
                            {item.icon}
                        </div>
                        <p className="mt-4 text-sm text-slate-500">{item.title}</p>
                        <p className="mt-1 text-2xl font-semibold text-slate-800">{item.value}</p>
                    </div>
                ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Today’s schedule</p>
                            <p className="text-sm text-slate-500">A quick snapshot of the team’s activity.</p>
                        </div>
                        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                            View all
                        </button>
                    </div>
                    <div className="mt-6 space-y-3">
                        {['Team meeting at 10:00', 'Payroll review at 13:00', 'New onboarding at 15:30'].map((task) => (
                            <div key={task} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                <span>{task}</span>
                                <span className="font-medium text-slate-800">Ready</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">Quick actions</p>
                    <div className="mt-4 space-y-3">
                        {['Add employee', 'Approve leave', 'Generate report'].map((action) => (
                            <button key={action} className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                                <span>{action}</span>
                                <span>→</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;