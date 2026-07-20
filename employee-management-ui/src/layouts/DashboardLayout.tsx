import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-800">
            <Sidebar />
            <main className="flex-1">
                <Navbar />
                <div className="p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;