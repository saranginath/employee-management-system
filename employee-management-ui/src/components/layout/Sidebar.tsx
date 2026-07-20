import { FiCalendar, FiDollarSign, FiHome, FiSettings, FiUsers } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const menu = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Employees', path: '/dashboard/employees', icon: <FiUsers /> },
    { name: 'Attendance', path: '/dashboard/attendance', icon: <FiCalendar /> },
    { name: 'Payroll', path: '/dashboard/payroll', icon: <FiDollarSign /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings /> },
];

const Sidebar = () => {
    return (
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100 lg:flex">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                    EMS
                </div>
                <div>
                    <p className="text-lg font-semibold">Employee Hub</p>
                    <p className="text-sm text-slate-400">Management Suite</p>
                </div>
            </div>

            <nav className="flex flex-col gap-2">
                {menu.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                isActive
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm font-semibold text-white">Need a quick update?</p>
                <p className="mt-1 text-sm text-slate-400">Keep your payroll and attendance in sync.</p>
            </div>
        </aside>
    );
};

export default Sidebar;