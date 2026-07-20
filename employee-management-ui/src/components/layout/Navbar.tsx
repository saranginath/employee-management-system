import { FiBell, FiSearch } from 'react-icons/fi';

function Navbar() {
    return (
        <header className="border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search employees"
                        className="w-40 border-none bg-transparent outline-none"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
                        <FiBell />
                    </button>
                    <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                            AD
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Admin</p>
                            <p className="text-xs text-slate-500">HR Lead</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;