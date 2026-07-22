import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/navbar/Navbar';
import Sidebar from '../components/layout/sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="flex pt-16">
                <Sidebar />

                <main className="ml-64 flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};



export default DashboardLayout;