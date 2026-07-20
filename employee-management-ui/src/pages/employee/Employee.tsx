const employees = [
    { name: 'Aisha Khan', role: 'HR Manager', status: 'Active' },
    { name: 'Daniel Cruz', role: 'Software Engineer', status: 'Active' },
    { name: 'Mina Patel', role: 'Operations Lead', status: 'On Leave' },
];

function Employee() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">Employees</h1>
                    <p className="text-sm text-slate-500">Manage your team members and their status.</p>
                </div>
                <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Add employee</button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Role</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.name} className="border-t border-slate-100">
                                <td className="px-4 py-3 font-medium text-slate-800">{employee.name}</td>
                                <td className="px-4 py-3 text-slate-600">{employee.role}</td>
                                <td className="px-4 py-3">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${employee.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {employee.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee;